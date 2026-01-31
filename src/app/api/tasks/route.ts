import { NextRequest, NextResponse } from "next/server"
import { getSession, requireAuth } from "@/lib/auth"

// In-memory storage for demo purposes
const tasks: Map<string, any[]> = new Map()
const projects: Map<string, any[]> = new Map()

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth()
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    const userTasks = tasks.get(authResult.userId) || []
    const filteredTasks = projectId
      ? userTasks.filter((t) => t.projectId === projectId)
      : userTasks

    return NextResponse.json({ tasks: filteredTasks })
  } catch {
    // Demo mode - return sample tasks
    return NextResponse.json({
      tasks: [
        {
          id: "1",
          title: "Design homepage mockup",
          description: "Create wireframes and high-fidelity mockups for the new homepage",
          status: "in-progress",
          priority: "high",
          projectId: "1",
          assignee: { name: "Mohamed Wael", avatar: null },
          dueDate: "2024-01-20",
          tags: ["design", "ui"],
          createdAt: "2024-01-10",
        },
        {
          id: "2",
          title: "Implement authentication",
          description: "Add JWT-based authentication with refresh tokens",
          status: "todo",
          priority: "high",
          projectId: "1",
          assignee: { name: "John Doe", avatar: null },
          dueDate: "2024-01-22",
          tags: ["backend", "security"],
          createdAt: "2024-01-11",
        },
        {
          id: "3",
          title: "Write API documentation",
          description: "Document all REST endpoints using OpenAPI spec",
          status: "done",
          priority: "medium",
          projectId: "1",
          assignee: { name: "Jane Smith", avatar: null },
          dueDate: "2024-01-15",
          tags: ["docs"],
          createdAt: "2024-01-08",
        },
        {
          id: "4",
          title: "Setup CI/CD pipeline",
          description: "Configure GitHub Actions for automated testing and deployment",
          status: "review",
          priority: "medium",
          projectId: "2",
          assignee: { name: "Mohamed Wael", avatar: null },
          dueDate: "2024-01-25",
          tags: ["devops"],
          createdAt: "2024-01-12",
        },
      ],
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const { title, description, status, priority, projectId, assigneeId, dueDate, tags } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const task = {
      id: Date.now().toString(),
      title,
      description: description || "",
      status: status || "todo",
      priority: priority || "medium",
      projectId: projectId || null,
      assignee: assigneeId ? { id: assigneeId, name: "User" } : null,
      dueDate: dueDate || null,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const userTasks = tasks.get(authResult.userId) || []
    userTasks.push(task)
    tasks.set(authResult.userId, userTasks)

    return NextResponse.json({ task }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await requireAuth()
    if (authResult instanceof NextResponse) return authResult

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
    }

    const userTasks = tasks.get(authResult.userId) || []
    const taskIndex = userTasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    userTasks[taskIndex] = {
      ...userTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    tasks.set(authResult.userId, userTasks)

    return NextResponse.json({ task: userTasks[taskIndex] })
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await requireAuth()
    if (authResult instanceof NextResponse) return authResult

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
    }

    const userTasks = tasks.get(authResult.userId) || []
    const filteredTasks = userTasks.filter((t) => t.id !== id)
    tasks.set(authResult.userId, filteredTasks)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }
}
