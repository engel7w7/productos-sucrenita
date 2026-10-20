import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const productsRouter = Router();

// GET /api/products
productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    const whereClause: any = {
      isActive: true,
    };

    if (category && typeof category === 'string') {
      whereClause.category = {
        slug: category,
      };
    }

    if (search && typeof search === 'string') {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// GET /api/products/:slug
productsRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: `Producto no encontrado con el slug: ${slug}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error(`Error fetching product by slug: ${req.params.slug}`, error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el detalle del producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});
