"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart,
  Search,
  Heart,
  Plus,
  Minus,
  Trash2,
  Star,
  Sparkles,
  Package,
  CreditCard,
  X,
  LogIn,
  LogOut,
  User,
  Settings,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  Bot,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Avatar } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Types
interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  stock: number
  tags: string[]
}

interface CartItem extends Product {
  quantity: number
}

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

// Sample Products Data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-canceling headphones with 40-hour battery life and crystal-clear audio.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics",
    rating: 4.8,
    reviews: 2341,
    stock: 50,
    tags: ["audio", "wireless", "bluetooth", "music"]
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
    category: "Electronics",
    rating: 4.6,
    reviews: 1823,
    stock: 35,
    tags: ["wearable", "health", "fitness", "smart"]
  },
  {
    id: "3",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "Home",
    rating: 4.5,
    reviews: 892,
    stock: 100,
    tags: ["lighting", "home", "modern", "led"]
  },
  {
    id: "4",
    name: "Mechanical Keyboard RGB",
    description: "Premium mechanical keyboard with customizable RGB lighting and tactile switches.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    category: "Electronics",
    rating: 4.7,
    reviews: 3421,
    stock: 75,
    tags: ["gaming", "typing", "rgb", "mechanical"]
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Full mesh ergonomic chair with lumbar support and adjustable armrests.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    category: "Furniture",
    rating: 4.4,
    reviews: 567,
    stock: 20,
    tags: ["office", "comfort", "ergonomic", "chair"]
  },
  {
    id: "6",
    name: "Portable Power Bank",
    description: "20000mAh fast-charging power bank with USB-C and wireless charging.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    category: "Electronics",
    rating: 4.3,
    reviews: 1234,
    stock: 200,
    tags: ["mobile", "charging", "portable", "power"]
  },
  {
    id: "7",
    name: "Canvas Backpack",
    description: "Durable canvas backpack with laptop compartment and water-resistant coating.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Fashion",
    rating: 4.6,
    reviews: 789,
    stock: 60,
    tags: ["travel", "laptop", "fashion", "backpack"]
  },
  {
    id: "8",
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound and home automation.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400",
    category: "Electronics",
    rating: 4.5,
    reviews: 2156,
    stock: 80,
    tags: ["smart", "voice", "home", "speaker"]
  },
]

// Categories
const categories = ["All", "Electronics", "Home", "Furniture", "Fashion"]

export default function EcommerceApp() {
  // State
  const [user, setUser] = React.useState<User | null>(null)
  const [products] = React.useState<Product[]>(sampleProducts)
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [wishlist, setWishlist] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
  const [recommendations, setRecommendations] = React.useState<Product[]>([])
  const [isLoadingRecs, setIsLoadingRecs] = React.useState(false)
  const [authForm, setAuthForm] = React.useState({ name: "", email: "", password: "" })

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Cart functions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }).filter((item) => item.quantity > 0)
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Wishlist functions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  // AI Recommendations
  const getAIRecommendations = async () => {
    setIsLoadingRecs(true)
    // Simulate AI recommendation API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Get user preferences from cart and wishlist
    const cartCategories = cart.map((item) => item.category)
    const cartTags = cart.flatMap((item) => item.tags)
    
    // Filter recommendations based on user behavior
    const recommended = products
      .filter((p) => !cart.find((c) => c.id === p.id))
      .filter((p) => 
        cartCategories.includes(p.category) || 
        p.tags.some((tag) => cartTags.includes(tag))
      )
      .slice(0, 4)
    
    setRecommendations(recommended.length > 0 ? recommended : products.slice(0, 4))
    setIsLoadingRecs(false)
  }

  React.useEffect(() => {
    if (cart.length > 0) {
      getAIRecommendations()
    }
  }, [cart.length])

  // Auth functions
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser({
      id: "1",
      name: authForm.name || "User",
      email: authForm.email,
      role: "user"
    })
    setIsAuthOpen(false)
    setAuthForm({ name: "", email: "", password: "" })
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    setWishlist([])
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Shopping
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold">
                Discover Products<br />Made Just For You
              </h1>
              <p className="text-white/80 max-w-md">
                Experience personalized shopping with AI recommendations powered by Hugging Face.
              </p>
            </div>
            <div className="relative">
              <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute" />
              <div className="relative z-10 flex items-center gap-4">
                <Bot className="w-24 h-24" />
                <div>
                  <p className="font-semibold">Smart AI</p>
                  <p className="text-sm text-white/70">Recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Categories */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-muted" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Button */}
            <Button
              variant="outline"
              className="relative gap-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar fallback={user.name.charAt(0)} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsAuthOpen(true)} className="gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-500" />
                  AI Recommendations For You
                </CardTitle>
                <CardDescription>
                  Based on your cart and preferences, powered by Hugging Face
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRecs ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommendations.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-32 w-full object-cover"
                        />
                        <CardContent className="p-3">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-primary font-bold">${product.price}</p>
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="group overflow-hidden card-hover">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={cn(
                        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        wishlist.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-gray-600 hover:bg-white"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", wishlist.includes(product.id) && "fill-current")} />
                    </button>
                    <Badge className="absolute top-3 left-3">{product.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Shopping Cart ({cartCount})</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-primary font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 ml-auto text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-4 border-t space-y-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full gap-2"
                      size="lg"
                      onClick={() => {
                        if (!user) {
                          setIsAuthOpen(true)
                        } else {
                          setIsCheckoutOpen(true)
                        }
                      }}
                    >
                      <CreditCard className="w-4 h-4" />
                      Checkout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{authMode === "login" ? "Sign In" : "Create Account"}</DialogTitle>
            <DialogDescription>
              {authMode === "login"
                ? "Welcome back! Please sign in to continue."
                : "Create an account to start shopping."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth}>
            <div className="space-y-4 py-4">
              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                {authMode === "login" ? "Sign In" : "Create Account"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              >
                {authMode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>Complete your order</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Order Summary</Label>
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Shipping Address</Label>
              <Input placeholder="123 Main St, City, Country" />
            </div>
            <div className="space-y-2">
              <Label>Card Number (Demo)</Label>
              <Input placeholder="4242 4242 4242 4242" />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={() => {
                alert("Order placed successfully! (Demo)")
                setCart([])
                setIsCheckoutOpen(false)
                setIsCartOpen(false)
              }}
            >
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
