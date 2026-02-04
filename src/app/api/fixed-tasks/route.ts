import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fixedTasks = await prisma.fixedTask.findMany({
    where: { userId: session.user.id },
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(fixedTasks);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const fixedTask = await prisma.fixedTask.create({
    data: {
      taskName: body.taskName,
      startTime: new Date(body.startTime),
      stopTime: new Date(body.stopTime),
      userId: session.user.id,
    },
  });

  return NextResponse.json(fixedTask, { status: 201 });
}