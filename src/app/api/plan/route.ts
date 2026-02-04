import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await prisma.plan.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!plan) {
    return NextResponse.json({ items: [] });
  }

  return NextResponse.json({
    items: plan.items.map((item) => ({
      time: item.time.toISOString(),
      taskName: item.taskName,
    })),
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items } = body;

  await prisma.plan.deleteMany({
    where: { userId: session.user.id },
  });

  const plan = await prisma.plan.create({
    data: {
      userId: session.user.id,
      items: {
        create: items.map((item: { time: string; taskName: string }, index: number) => ({
          time: new Date(item.time),
          taskName: item.taskName,
          order: index,
        })),
      },
    },
    include: {
      items: {
        orderBy: { order: "asc" },
      },
    },
  });

  return NextResponse.json({
    items: plan.items.map((item) => ({
      time: item.time.toISOString(),
      taskName: item.taskName,
    })),
  });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.plan.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}