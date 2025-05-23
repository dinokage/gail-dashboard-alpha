import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as needed
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        name: "asc", // Optional: order regions by name
      },
    });
    return NextResponse.json(regions, { status: 200 });
  } catch (error) {
    console.error("Error fetching regions:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching regions." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Optional: Add role-based access control if only certain users can create regions
  // if (session.user.role !== 'ADMIN') { // Assuming user object has a role property
  //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  // }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "Region name is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // Check if region already exists (Prisma unique constraint will also handle this)
    const existingRegion = await prisma.region.findUnique({
      where: { name: name.trim() },
    });

    if (existingRegion) {
      return NextResponse.json(
        { message: `Region with name "${name.trim()}" already exists.` },
        { status: 409 } // Conflict
      );
    }

    const newRegion = await prisma.region.create({
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(newRegion, { status: 201 });
  } catch (error: any) {
    console.error("Error creating region:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      // Should be caught by the manual check above, but as a fallback
      return NextResponse.json(
        { message: `Region with name already exists.` },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "An error occurred while creating the region." , error: error.message },
      { status: 500 }
    );
  }
}
