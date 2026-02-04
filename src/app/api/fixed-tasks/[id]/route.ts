import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updateData: Record<string, unknown> = {};
  
  if (body.deactivated !== undefined) updateData.deactivated = body.deactivated;
  if (body.taskName !== undefined) updateData.taskName = body.taskName;
  if (body.startTime !== undefined) updateData.startTime = new Date(body.startTime);
  if (body.stopTime !== undefined) updateData.stopTime = new Date(body.stopTime);

  const task = await prisma.fixedTask.updateMany({
    where: { id: params.id, userId: session.user.id },
    data: updateData,
  });

  if (task.count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.fixedTask.deleteMany({
    where: { id: params.id, userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}