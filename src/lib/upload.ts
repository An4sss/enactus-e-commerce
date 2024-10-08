import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export async function uploadMiddleware(req: NextRequest) {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (!file) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Ensure the directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const filename = `${Date.now()}_${(body.file as File).name}`;
  const filePath = path.resolve(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  // Write the file to the uploads directory
  fs.writeFileSync(filePath, buffer);

  // Modify the request object to include the imgSrc
  const imgSrc = `/uploads/${filename}`;  

  return {
    formData,
    success: true,
    imgSrc,
    fileName: filename,
    
  };
}
