"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Eye,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Activity
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Sample data
const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240, visitors: 12000 },
  { month: "Feb", revenue: 3000, orders: 198, visitors: 10000 },
  { month: "Mar", revenue: 5000, orders: 300, visitors: 15000 },
  { month: "Apr", revenue: 4500, orders: 270, visitors: 13500 },
  { month: "May", revenue: 6000, orders: 350, visitors: 18000 },
  { month: "Jun", revenue: 5500, orders: 320, visitors: 16500 },
  { month: "Jul", revenue: 7000, orders: 410, visitors: 21000 },
  { month: "Aug", revenue: 6500, orders: 380, visitors: 19500 },
  { month: "Sep", revenue: 8000, orders: 470, visitors: 24000 },
  { month: "Oct", revenue: 7500, orders: 440, visitors: 22500 },
  { month: "Nov", revenue: 9000, orders: 520, visitors: 27000 },
  { month: "Dec", revenue: 11000, orders: 650, visitors: 33000 },
]

const categoryData = [
  { name: "Electronics", value: 4500, color: "#6366f1" },
  { name: "Clothing", value: 3200, color: "#ec4899" },
  { name: "Home & Garden", value: 2800, color: "#10b981" },
  { name: "Sports", value: 2100, color: "#f59e0b" },
  { name: "Books", value: 1400, color: "#8b5cf6" },
]

const recentOrders = [
  { id: "#12345", customer: "John Doe", email: "john@example.com", amount: 125.00, status: "completed", date: "2024-01-15" },
  { id: "#12346", customer: "Jane Smith", email: "jane@example.com", amount: 249.99, status: "processing", date: "2024-01-15" },
  { id: "#12347", customer: "Bob Wilson", email: "bob@example.com", amount: 89.50, status: "completed", date: "2024-01-14" },
  { id: "#12348", customer: "Alice Brown", email: "alice@example.com", amount: 450.00, status: "pending", date: "2024-01-14" },
  { id: "#12349", customer: "Charlie Davis", email: "charlie@example.com", amount: 199.99, status: "completed", date: "2024-01-13" },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 1234, revenue: 24680, growth: 12.5 },
  { name: "Smart Watch Pro", sales: 892, revenue: 31220, growth: 8.3 },
  { name: "Mechanical Keyboard", sales: 756, revenue: 11340, growth: -2.1 },
  { name: "Portable Speaker", sales: 623, revenue: 8722, growth: 15.7 },
  { name: "USB-C Hub", sales: 512, revenue: 7680, growth: 5.2 },
]

const trafficSources = [
  { source: "Organic Search", visitors: 45000, percentage: 35 },
  { source: "Direct", visitors: 32000, percentage: 25 },
  { source: "Social Media", visitors: 25600, percentage: 20 },
  { source: "Referral", visitors: 15400, percentage: 12 },
  { source: "Email", visitors: 10200, percentage: 8 },
]

const statusColors: Record<string, string> = {
  completed: "bg-green-500",
  processing: "bg-blue-500",
  pending: "bg-amber-500",
  cancelled: "bg-red-500",
}

export default function AdminDashboardApp() {
  const [dateRange, setDateRange] = React.useState("30d")
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  // Stats cards data
  const stats = [
    {
      title: "Total Revenue",
      value: "$72,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Orders",
      value: "4,548",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Visitors",
      value: "232,500",
      change: "+23.1%",
      trend: "up",
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "New Customers",
      value: "1,245",
      change: "-3.2%",
      trend: "down",
      icon: Users,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      {/* Header */}
      <div className="bg-background border-b sticky top-16 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Mohamed! Here's what's happening.</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Date Range */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Last {dateRange === "7d" ? "7 days" : dateRange === "30d" ? "30 days" : "12 months"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDateRange("7d")}>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateRange("30d")}>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDateRange("12m")}>Last 12 months</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Refresh */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
              </Button>

              {/* Export */}
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <Badge
                      variant={stat.trend === "up" ? "default" : "destructive"}
                      className={cn(
                        "gap-1",
                        stat.trend === "up"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Sales by Category</CardTitle>
                <CardDescription>Distribution across product categories</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar fallback={order.customer.charAt(0)} />
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.amount.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", statusColors[order.status])} />
                        <span className="text-sm text-muted-foreground capitalize">{order.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Products</CardTitle>
              <CardDescription>Best selling products this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">#{i + 1}</span>
                      <span className="font-medium text-sm truncate max-w-[150px]">{product.name}</span>
                    </div>
                    <Badge
                      variant={product.growth >= 0 ? "default" : "destructive"}
                      className={cn(
                        "text-xs",
                        product.growth >= 0
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {product.growth >= 0 ? "+" : ""}{product.growth}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{product.sales} sales</span>
                    <span>${product.revenue.toLocaleString()}</span>
                  </div>
                  <Progress value={(product.sales / 1500) * 100} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {trafficSources.map((source) => (
                <div
                  key={source.source}
                  className="p-4 rounded-lg bg-muted/50 space-y-2"
                >
                  <p className="text-sm text-muted-foreground">{source.source}</p>
                  <p className="text-2xl font-bold">{source.visitors.toLocaleString()}</p>
                  <Progress value={source.percentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">{source.percentage}% of total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
