import { NextRequest, NextResponse } from 'next/server'
import { getProductRecommendations } from '@/lib/huggingface'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userPreferences, cartItems, userId } = body

    // Build user preference string from cart items and explicit preferences
    let preferenceText = userPreferences || ''
    
    if (cartItems && cartItems.length > 0) {
      const cartCategories = cartItems.map((item: any) => item.category).join(', ')
      const cartNames = cartItems.map((item: any) => item.name).join(', ')
      preferenceText += ` User has shown interest in: ${cartCategories}. Products in cart: ${cartNames}`
    }

    // Get all products from database
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
      },
    })

    // Filter out products already in cart
    const cartProductIds = cartItems?.map((item: any) => item.id) || []
    const availableProducts = products.filter(
      (product) => !cartProductIds.includes(product.id)
    )

    // Get AI-powered recommendations
    const recommendations = await getProductRecommendations(
      preferenceText,
      availableProducts
    )

    // Get full product details for recommended products
    const recommendedProducts = await prisma.product.findMany({
      where: {
        id: {
          in: recommendations.map((r) => r.productId),
        },
      },
    })

    // Add recommendation scores
    const result = recommendedProducts.map((product) => {
      const rec = recommendations.find((r) => r.productId === product.id)
      return {
        ...product,
        recommendationScore: rec?.score || 0,
        recommendationReason: rec?.reason || 'Based on your preferences',
      }
    })

    // Sort by score
    result.sort((a, b) => b.recommendationScore - a.recommendationScore)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error getting recommendations:', error)
    
    // Fallback to random products if AI fails
    const fallbackProducts = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json(fallbackProducts)
  }
}
