"use client"

import * as React from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import {
  Plus,
  MoreHorizontal,
  Calendar,
  Users,
  Settings,
  Search,
  Bell,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
  X,
  Folder,
  ChevronRight,
  ChevronDown,
  User,
  LogOut,
  Zap,
  LayoutGrid,
  List,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "in-review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee?: TeamMember
  dueDate?: string
  labels: string[]
  projectId: string
  createdAt: string
}

interface Project {
  id: string
  name: string
  color: string
  tasksCount: number
  completedCount: number
}

interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: "owner" | "admin" | "member" | "viewer"
}

interface Board {
  id: string
  title: string
  status: Task["status"]
  color: string
}

// Sample data
const sampleProjects: Project[] = [
  { id: "1", name: "Website Redesign", color: "#6366f1", tasksCount: 12, completedCount: 5 },
  { id: "2", name: "Mobile App", color: "#ec4899", tasksCount: 8, completedCount: 2 },
  { id: "3", name: "API Development", color: "#10b981", tasksCount: 15, completedCount: 10 },
]

const sampleTeam: TeamMember[] = [
  { id: "1", name: "Mohamed Wael", email: "contact@itsmohamedwael.info", role: "owner" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "member" },
  { id: "4", name: "Bob Wilson", email: "bob@example.com", role: "member" },
]

const boards: Board[] = [
  { id: "1", title: "To Do", status: "todo", color: "bg-slate-500" },
  { id: "2", title: "In Progress", status: "in-progress", color: "bg-blue-500" },
  { id: "3", title: "In Review", status: "in-review", color: "bg-amber-500" },
  { id: "4", title: "Done", status: "done", color: "bg-green-500" },
]

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage mockup",
    description: "Create wireframes and high-fidelity mockups for the new homepage",
    status: "in-progress",
    priority: "high",
    assignee: sampleTeam[0],
    dueDate: "2024-02-15",
    labels: ["design", "urgent"],
    projectId: "1",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up JWT authentication with refresh tokens",
    status: "done",
    priority: "high",
    assignee: sampleTeam[1],
    dueDate: "2024-02-01",
    labels: ["backend", "security"],
    projectId: "1",
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all API endpoints using OpenAPI spec",
    status: "todo",
    priority: "medium",
    assignee: sampleTeam[2],
    dueDate: "2024-02-20",
    labels: ["documentation"],
    projectId: "3",
    createdAt: "2024-01-12",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "in-review",
    priority: "medium",
    assignee: sampleTeam[3],
    dueDate: "2024-02-10",
    labels: ["devops"],
    projectId: "3",
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    title: "Mobile app navigation",
    description: "Implement bottom tab navigation and stack navigation",
    status: "todo",
    priority: "high",
    assignee: sampleTeam[0],
    dueDate: "2024-02-18",
    labels: ["mobile", "frontend"],
    projectId: "2",
    createdAt: "2024-01-15",
  },
  {
    id: "6",
    title: "Database optimization",
    description: "Add indexes and optimize slow queries",
    status: "in-progress",
    priority: "urgent",
    assignee: sampleTeam[1],
    dueDate: "2024-02-05",
    labels: ["backend", "performance"],
    projectId: "3",
    createdAt: "2024-01-20",
  },
]

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-slate-500",
  medium: "bg-blue-500",
  high: "bg-amber-500",
  urgent: "bg-red-500",
}

const priorityIcons: Record<Task["priority"], React.ReactNode> = {
  low: <Clock className="w-3 h-3" />,
  medium: <Clock className="w-3 h-3" />,
  high: <AlertCircle className="w-3 h-3" />,
  urgent: <AlertCircle className="w-3 h-3" />,
}

export default function TaskManagerApp() {
  const [user] = React.useState<TeamMember>(sampleTeam[0])
  const [projects, setProjects] = React.useState<Project[]>(sampleProjects)
  const [tasks, setTasks] = React.useState<Task[]>(sampleTasks)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isNewTaskOpen, setIsNewTaskOpen] = React.useState(false)
  const [isNewProjectOpen, setIsNewProjectOpen] = React.useState(false)
  const [editingTask, setEditingTask] = React.useState<Task | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"board" | "list">("board")
  
  const [newTaskForm, setNewTaskForm] = React.useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    assigneeId: "",
    dueDate: "",
    labels: "",
  })

  const [newProjectForm, setNewProjectForm] = React.useState({
    name: "",
    color: "#6366f1",
  })

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesProject = !selectedProject || task.projectId === selectedProject.id
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesProject && matchesSearch
  })

  // Group tasks by status
  const tasksByStatus = boards.reduce((acc, board) => {
    acc[board.status] = filteredTasks.filter((task) => task.status === board.status)
    return acc
  }, {} as Record<Task["status"], Task[]>)

  // Calculate project progress
  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter((t) => t.projectId === projectId)
    const completedTasks = projectTasks.filter((t) => t.status === "done")
    return projectTasks.length > 0 ? (completedTasks.length / projectTasks.length) * 100 : 0
  }

  // Add new task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskForm.title,
      description: newTaskForm.description,
      status: "todo",
      priority: newTaskForm.priority,
      assignee: sampleTeam.find((m) => m.id === newTaskForm.assigneeId),
      dueDate: newTaskForm.dueDate,
      labels: newTaskForm.labels.split(",").map((l) => l.trim()).filter(Boolean),
      projectId: selectedProject?.id || "1",
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
    setNewTaskForm({
      title: "",
      description: "",
      priority: "medium",
      assigneeId: "",
      dueDate: "",
      labels: "",
    })
    setIsNewTaskOpen(false)
  }

  // Update task status (drag and drop)
  const handleTaskStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  // Add new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectForm.name,
      color: newProjectForm.color,
      tasksCount: 0,
      completedCount: 0,
    }
    setProjects((prev) => [...prev, newProject])
    setNewProjectForm({ name: "", color: "#6366f1" })
    setIsNewProjectOpen(false)
  }

  return (
    <div className="min-h-screen bg-background pt-16 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 z-30",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">TaskFlow</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Projects */}
          <div className="flex-1 overflow-auto p-4 space-y-2">
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Projects</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsNewProjectOpen(true)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            )}

            <button
              onClick={() => setSelectedProject(null)}
              className={cn(
                "w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left",
                !selectedProject ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Folder className="w-4 h-4" />
              {!sidebarCollapsed && <span className="text-sm">All Tasks</span>}
            </button>

            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left",
                  selectedProject?.id === project.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: project.color }}
                />
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="text-sm truncate block">{project.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={getProjectProgress(project.id)} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(getProjectProgress(project.id))}%
                      </span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <Avatar fallback={user.name.charAt(0)} />
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-card border-b sticky top-16 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">
                  {selectedProject?.name || "All Tasks"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredTasks.length} tasks • {filteredTasks.filter(t => t.status === "done").length} completed
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === "board" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("board")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Team */}
                <div className="flex -space-x-2">
                  {sampleTeam.slice(0, 4).map((member) => (
                    <Avatar
                      key={member.id}
                      fallback={member.name.charAt(0)}
                      className="border-2 border-background w-8 h-8"
                    />
                  ))}
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* Add Task */}
                <Button onClick={() => setIsNewTaskOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Board View */}
        {viewMode === "board" ? (
          <div className="p-6 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {boards.map((board) => (
                <div key={board.id} className="w-80 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn("w-3 h-3 rounded-full", board.color)} />
                    <h3 className="font-semibold">{board.title}</h3>
                    <Badge variant="secondary" className="ml-auto">
                      {tasksByStatus[board.status]?.length || 0}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {tasksByStatus[board.status]?.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <Card className="group cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                    >
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setEditingTask(task)}>
                                      <Edit className="w-4 h-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {boards.map((b) => (
                                      <DropdownMenuItem
                                        key={b.id}
                                        onClick={() => handleTaskStatusChange(task.id, b.status)}
                                      >
                                        Move to {b.title}
                                      </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-500"
                                      onClick={() => handleDeleteTask(task.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {task.description && (
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                  {task.description}
                                </p>
                              )}

                              {task.labels.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {task.labels.map((label) => (
                                    <Badge key={label} variant="secondary" className="text-xs">
                                      {label}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge className={cn("text-white text-xs", priorityColors[task.priority])}>
                                    {priorityIcons[task.priority]}
                                    <span className="ml-1">{task.priority}</span>
                                  </Badge>
                                </div>
                                {task.assignee && (
                                  <Avatar
                                    fallback={task.assignee.name.charAt(0)}
                                    className="w-6 h-6"
                                  />
                                )}
                              </div>

                              {task.dueDate && (
                                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Add task to column */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setNewTaskForm({ ...newTaskForm })
                        setIsNewTaskOpen(true)
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add a task
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="p-6">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Task</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Priority</th>
                      <th className="text-left p-4 font-medium">Assignee</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-md">
                              {task.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{task.status}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={cn("text-white", priorityColors[task.priority])}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {task.assignee && (
                            <div className="flex items-center gap-2">
                              <Avatar fallback={task.assignee.name.charAt(0)} className="w-6 h-6" />
                              <span className="text-sm">{task.assignee.name}</span>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingTask(task)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* New Task Dialog */}
      <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a new task to your project.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTask}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  placeholder="Task title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
                  placeholder="Task description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value as Task["priority"] })}
                    className="w-full h-10 rounded-md border bg-background px-3"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <select
                    id="assignee"
                    value={newTaskForm.assigneeId}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, assigneeId: e.target.value })}
                    className="w-full h-10 rounded-md border bg-background px-3"
                  >
                    <option value="">Unassigned</option>
                    {sampleTeam.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTaskForm.dueDate}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labels">Labels (comma separated)</Label>
                <Input
                  id="labels"
                  value={newTaskForm.labels}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, labels: e.target.value })}
                  placeholder="design, frontend, urgent"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewTaskOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to organize your tasks.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProject}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  placeholder="My Project"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectColor">Color</Label>
                <div className="flex gap-2">
                  {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewProjectForm({ ...newProjectForm, color })}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        newProjectForm.color === color ? "border-foreground" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
