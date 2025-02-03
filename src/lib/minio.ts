import * as Minio from 'minio';

export const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET!
});

export async function getDrawingUrl(bucketName: string, fileName: string) {
    try {
        // Generate presigned URL valid for 1 hour
        const url = await minioClient.presignedGetObject(bucketName, fileName, 3600);
        return url;
    } catch (err) {
        console.error('Error getting presigned URL:', err);
        throw err;
    }
}