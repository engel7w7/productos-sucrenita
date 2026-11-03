import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const productsRouter = Router();

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

productsRouter.get('/admin/all', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
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
    res.status(500).json({
      success: false,
      message: 'Error al obtener inventario completo',
    });
  }
});

productsRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const rawSlug = decodeURIComponent(req.params.slug).trim();

    const product = await prisma.product.findFirst({
      where: {
        slug: { equals: rawSlug, mode: 'insensitive' },
      },
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
        message: `Producto no encontrado con el slug: ${rawSlug}`,
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

productsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, stock, imageUrl, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, precio y categoría requeridos',
      });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description: description || null,
        price: Number(price),
        stock: Number(stock) || 0,
        imageUrl: imageUrl || null,
        categoryId,
        isActive: true,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message,
    });
  }
});

productsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, stock, imageUrl, categoryId, isActive } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(categoryId && { categoryId }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message,
    });
  }
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return res.status(200).json({
      success: true,
      message: 'Producto desactivado exitosamente',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al desactivar producto',
    });
  }
});
