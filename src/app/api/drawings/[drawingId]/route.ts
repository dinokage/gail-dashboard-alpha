import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as needed
import prisma from "@/lib/prisma";
import { getDrawingUrl } from "@/lib/minio"; // Ensure this path is correct

interface Params {
  params: {
    drawingId: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { drawingId } = params;

  if (!drawingId || typeof drawingId !== "string") {
    return NextResponse.json(
      { message: "Drawing ID is required." },
      { status: 400 }
    );
  }

  try {
    const drawing = await prisma.drawing.findUnique({
      where: { id: drawingId },
    });

    if (!drawing) {
      return NextResponse.json(
        { message: "Drawing not found." },
        { status: 404 }
      );
    }

    // Generate the presigned URL
    const presignedUrl = await getDrawingUrl(drawing.bucket, drawing.fileName);

    return NextResponse.json({ presignedUrl }, { status: 200 });
  } catch (error: any) {
    console.error(`Error generating presigned URL for drawing ${drawingId}:`, error);
    if (error.message && error.message.includes("does not exist")) { // More specific check for MinIO object not found
        return NextResponse.json(
            { message: "Drawing file not found in storage." },
            { status: 404 }
        );
    }
    return NextResponse.json(
      { message: "An error occurred while generating the download URL.", error: error.message },
      { status: 500 }
    );
  }
}
