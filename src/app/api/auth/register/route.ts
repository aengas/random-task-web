import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, name } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Brukernavn og passord er påkrevd" },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: "Passordet må være minst 4 tegn" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Brukernavnet er allerede i bruk" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        password, // I produksjon: bruk bcrypt.hash(password, 10)
        name: name || username,
      },
    });

    return NextResponse.json(
      { message: "Bruker opprettet", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Kunne ikke registrere bruker" },
      { status: 500 }
    );
  }
}