import { NextRequest, NextResponse } from 'next/server'
import { signUp, signIn, signOut, getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, name, email, password } = body

    switch (action) {
      case 'signup':
        if (!name || !email || !password) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }
        const signUpResult = await signUp(name, email, password)
        if (!signUpResult.success) {
          return NextResponse.json({ error: signUpResult.error }, { status: 400 })
        }
        return NextResponse.json({ success: true, token: signUpResult.token })

      case 'signin':
        if (!email || !password) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }
        const signInResult = await signIn(email, password)
        if (!signInResult.success) {
          return NextResponse.json({ error: signInResult.error }, { status: 401 })
        }
        return NextResponse.json({ success: true, token: signInResult.token })

      case 'signout':
        await signOut()
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ user: null })
    }
    return NextResponse.json({ user: session })
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json({ user: null })
  }
}
