import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as needed
import prisma from "@/lib/prisma";

interface Params {
  params: {
    regionId: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { regionId } = params;

  if (!regionId || typeof regionId !== "string") {
    return NextResponse.json(
      { message: "Region ID is required." },
      { status: 400 }
    );
  }

  try {
    const region = await prisma.region.findUnique({
      where: { id: regionId },
    });

    if (!region) {
      return NextResponse.json(
        { message: "Region not found." },
        { status: 404 }
      );
    }

    const stations = await prisma.station.findMany({
      where: { regionId: regionId },
      orderBy: {
        name: "asc",
      },
      include: {
        drawings: { // Include related drawings
          orderBy: {
            createdAt: "desc", // Order drawings by creation date, newest first
          },
        },
      },
    });

    return NextResponse.json({ region, stations }, { status: 200 });
  } catch (error) {
    console.error(`Error fetching stations for region ${regionId}:`, error);
    return NextResponse.json(
      { message: "An error occurred while fetching stations." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { regionId } = params;

  if (!regionId || typeof regionId !== "string") {
    return NextResponse.json(
      { message: "Region ID is required." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { name: stationName } = body;

    if (!stationName || typeof stationName !== "string" || stationName.trim() === "") {
      return NextResponse.json(
        { message: "Station name is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // 1. Check if the region exists
    const region = await prisma.region.findUnique({
      where: { id: regionId },
    });

    if (!region) {
      return NextResponse.json(
        { message: "Parent region not found." },
        { status: 404 }
      );
    }

    // 2. Attempt to create the station
    // Prisma will automatically handle the @@unique([name, regionId]) constraint
    const newStation = await prisma.station.create({
      data: {
        name: stationName.trim(),
        regionId: regionId,
      },
    });

    return NextResponse.json(newStation, { status: 201 });
  } catch (error: any) {
    console.error(`Error creating station in region ${regionId}:`, error);
    // Handle unique constraint violation (station name already exists in this region)
    if (error.code === 'P2002' && error.meta?.target?.includes('name') && error.meta?.target?.includes('regionId')) {
      return NextResponse.json(
        { message: `Station with name "${(await req.json()).name.trim()}" already exists in this region.` },
        { status: 409 } // Conflict
      );
    }
    return NextResponse.json(
      { message: "An error occurred while creating the station.", error: error.message },
      { status: 500 }
    );
  }
}
