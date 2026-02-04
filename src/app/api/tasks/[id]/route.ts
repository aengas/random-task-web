import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updateData: Record<string, unknown> = {};
  
  if (body.deactivated !== undefined) updateData.deactivated = body.deactivated;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.required !== undefined) updateData.required = body.required;
  if (body.comment !== undefined) updateData.comment = body.comment;

  const task = await prisma.task.updateMany({
    where: { id, userId: session.user.id },
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

  const { id } = await params;
  await prisma.task.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}