import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-in-production')

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

// ===================================================
// PASSWORD HASHING
// ===================================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// ===================================================
// JWT TOKENS
// ===================================================

export async function createToken(payload: { userId: string; email: string; role: string }): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

// ===================================================
// SESSION MANAGEMENT
// ===================================================

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) return null
  
  return verifyToken(token)
}

export async function setSession(token: string): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function clearSession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete('auth-token')
}

// ===================================================
// USER AUTHENTICATION
// ===================================================

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; token?: string }> {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Create and return token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    await setSession(token)

    return { success: true, token }
  } catch (error) {
    console.error('Sign up error:', error)
    return { success: false, error: 'Failed to create account' }
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; token?: string }> {
  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Create and return token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    await setSession(token)

    return { success: true, token }
  } catch (error) {
    console.error('Sign in error:', error)
    return { success: false, error: 'Failed to sign in' }
  }
}

export async function signOut(): Promise<void> {
  await clearSession()
}

// ===================================================
// AUTHORIZATION
// ===================================================

export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireAdmin(): Promise<JWTPayload> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  if (session.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required')
  }
  return session
}

// ===================================================
// USER DATA
// ===================================================

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  })

  return user
}
