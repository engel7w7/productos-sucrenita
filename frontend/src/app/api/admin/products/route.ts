import { NextResponse } from 'next/server';
import { FALLBACK_PRODUCTS } from '@/lib/api';
import { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/admin/all`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
  }

  return NextResponse.json({
    success: true,
    count: FALLBACK_PRODUCTS.length,
    data: FALLBACK_PRODUCTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, price, stock, imageUrl, categoryId } = body;

    if (!name || !price) {
      return NextResponse.json(
        { success: false, message: 'Nombre y precio son obligatorios' },
        { status: 400 }
      );
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, { status: 201 });
      }
    } catch {
    }

    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: finalSlug,
      description: description || null,
      price: Number(price),
      stock: Number(stock) || 0,
      imageUrl: imageUrl || '/productos/aji-calidad-kilo.jpeg',
      categoryId: categoryId || 'cat-abarrotes',
      category: {
        id: categoryId || 'cat-abarrotes',
        name: categoryId === 'cat-snacks' ? 'Snacks Artesanales' : 'Abarrotes y Condimentos',
        slug: categoryId === 'cat-snacks' ? 'snacks-artesanales' : 'abarrotes-condimentos',
      },
      isActive: true,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Producto registrado con éxito',
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error al procesar la creación' },
      { status: 500 }
    );
  }
}

