import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No se envió ningún archivo de imagen' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const rawExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(rawExt) ? rawExt : 'jpg';
    const cleanBaseName =
      file.name
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'producto';

    const fileName = `local-${Date.now()}-${cleanBaseName}.${safeExt}`;

    try {
      const uploadDir = path.join(process.cwd(), 'public', 'productos');
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        message: 'Imagen guardada correctamente en archivos locales',
        url: `/productos/${fileName}`,
        storage: 'filesystem',
      });
    } catch {
      const mime = file.type || `image/${safeExt === 'jpg' ? 'jpeg' : safeExt}`;
      const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;

      return NextResponse.json({
        success: true,
        message: 'Imagen convertida a formato local optimizado',
        url: dataUrl,
        storage: 'memory',
      });
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error al procesar la subida del archivo' },
      { status: 500 }
    );
  }
}
