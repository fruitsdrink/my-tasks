import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId: userId!,
      },
    });

    return NextResponse.json({ task });
  } catch (error) {
    console.log("Error createing task: ", error);
    return NextResponse.json({
      error: "Error creating task",
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error getting task: ", error);
    return NextResponse.json({
      error: "Error getting task",
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const task = await prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        isCompleted: isCompleted ? true : false,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error updating task: ", error);
    return NextResponse.json({
      error: "Error updating task",
      status: 500,
    });
  }
}
