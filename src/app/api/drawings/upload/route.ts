import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { minioClient } from "@/lib/minio"; // Assuming minioClient is correctly configured and exported
import { randomUUID } from "crypto"; // For generating unique filenames

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const stationId = formData.get("stationId") as string | null;
    // const originalName = formData.get("originalName") as string | null; // Or use file.name

    if (!file) {
      return NextResponse.json({ message: "File is required." }, { status: 400 });
    }
    if (!stationId || typeof stationId !== 'string') {
      return NextResponse.json({ message: "Station ID is required." }, { status: 400 });
    }

    // Check if the station exists
    const station = await prisma.station.findUnique({ where: { id: stationId } });
    if (!station) {
      return NextResponse.json({ message: "Station not found." }, { status: 404 });
    }

    const bucketName = "drawings"; // As specified
    // Ensure bucket exists (optional, often done manually or via startup script)
    // try {
    //   const bucketExists = await minioClient.bucketExists(bucketName);
    //   if (!bucketExists) {
    //     await minioClient.makeBucket(bucketName);
    //     console.log(`Bucket ${bucketName} created successfully.`);
    //   }
    // } catch (err) {
    //   console.error("Error checking/creating bucket:", err);
    //   return NextResponse.json({ message: "Failed to ensure MinIO bucket exists.", error: (err as Error).message }, { status: 500 });
    // }


    const uniqueFileName = `${randomUUID()}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileSize = file.size;
    const fileMimeType = file.type; // Get MIME type

    // Upload to MinIO
    await minioClient.putObject(
      bucketName,
      uniqueFileName,
      fileBuffer,
      fileSize,
      { 'Content-Type': fileMimeType } // Set content type for proper serving/preview
    );

    // Save metadata to Prisma
    const newDrawing = await prisma.drawing.create({
      data: {
        bucket: bucketName,
        fileName: uniqueFileName,
        originalName: file.name, // Using the actual file name as originalName
        size: fileSize,
        stationId: stationId,
        // You might want to add other fields like uploadedBy (userId from session), mimeType, etc.
        // userId: session.user.id, // If you store user ID on session
      },
    });

    return NextResponse.json({
      message: "Drawing uploaded successfully!",
      drawing: newDrawing,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error uploading drawing:", error);
    // Specific error for MinIO or Prisma if possible
    if (error.code === 'P2003') { // Foreign key constraint failed (e.g. stationId doesn't exist)
        return NextResponse.json({ message: "Invalid Station ID or related data error.", error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "An error occurred during file upload.", error: error.message },
      { status: 500 }
    );
  }
}
