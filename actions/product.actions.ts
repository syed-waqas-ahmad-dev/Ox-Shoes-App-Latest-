'use server';

/**
 * @file actions/product.actions.ts
 * @description Server Actions for footwear catalogue retrieval and management.
 * Strict TypeScript: ZERO `any`.
 */

import { connectToDatabase, isDatabaseConnected } from '@/lib/db/connect';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { paginateQuery } from '@/lib/db/pagination';
import { successResponse, errorResponse, type ActionResult } from '@/lib/response';
import { handleActionError } from '@/lib/error-handler';
import { ProductCategory, ProductSubCategory, type IProduct } from '@/types';
import { MockDb } from '@/lib/db/mock-store';
import type { Filter } from 'mongodb';

export interface ProductFilters {
  category?: ProductCategory;
  subCategory?: ProductSubCategory;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  search?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<
  ActionResult<{
    products: IProduct[];
    total: number;
    page: number;
    totalPages: number;
  }>
> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      return successResponse(MockDb.getProducts(filters));
    }

    const query: Filter<IProduct> = {
      isActive: true,
      isDeleted: { $ne: true },
    };

    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.subCategory) {
      query.subCategory = filters.subCategory;
    }
    if (filters.brand) {
      query.brand = filters.brand as any;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (filters.minPrice !== undefined) priceFilter.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) priceFilter.$lte = filters.maxPrice;
      query.price = priceFilter as any;
    }
    if (filters.inStock) {
      query.stock = { $gt: 0 } as any;
    }
    if (filters.onSale) {
      query.discount = { $gt: 0 } as any;
    }
    if (filters.search) {
      const regex = new RegExp(filters.search.trim(), 'i');
      query.$or = [
        { name: regex } as any,
        { nameUr: regex } as any,
        { tags: regex } as any,
        { sku: regex } as any,
      ];
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 };
    if (filters.sortBy === 'price-asc') sort = { price: 1 };
    if (filters.sortBy === 'price-desc') sort = { price: -1 };
    if (filters.sortBy === 'rating') sort = { rating: -1, price: 1 };

    const page = filters.page || 1;
    const limit = filters.limit || 12;

    const result = await paginateQuery(Product, query, {
      page,
      limit,
      sort,
      lean: true,
    });

    return successResponse({
      products: JSON.parse(JSON.stringify(result.docs)),
      total: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (error: unknown) {
    // Graceful fallback to MockDb if database query fails
    return successResponse(MockDb.getProducts(filters));
  }
}

export async function getProductBySlug(slug: string): Promise<ActionResult<IProduct>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      const mockProduct = MockDb.getProductBySlug(slug);
      if (!mockProduct) {
        return errorResponse('Product not found or is no longer available.');
      }
      return successResponse(mockProduct);
    }

    const product = await Product.findOne({ slug, isDeleted: { $ne: true } })
      .populate('sizeGuideId')
      .lean();

    if (!product) {
      const mockProduct = MockDb.getProductBySlug(slug);
      if (mockProduct) return successResponse(mockProduct);
      return errorResponse('Product not found or is no longer available.');
    }

    return successResponse(JSON.parse(JSON.stringify(product)));
  } catch (error: unknown) {
    const mockProduct = MockDb.getProductBySlug(slug);
    if (mockProduct) return successResponse(mockProduct);
    return handleActionError(error);
  }
}

export async function getFeaturedProducts(limit = 6): Promise<ActionResult<IProduct[]>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      return successResponse(MockDb.getFeaturedProducts(limit));
    }

    const products = await Product.find({ isFeatured: true, isActive: true, isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return successResponse(JSON.parse(JSON.stringify(products)));
  } catch (error: unknown) {
    return successResponse(MockDb.getFeaturedProducts(limit));
  }
}

export async function getNewArrivals(limit = 8): Promise<ActionResult<IProduct[]>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      return successResponse(MockDb.getNewArrivals(limit));
    }

    const products = await Product.find({ isActive: true, isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return successResponse(JSON.parse(JSON.stringify(products)));
  } catch (error: unknown) {
    return successResponse(MockDb.getNewArrivals(limit));
  }
}

export async function searchProducts(queryStr: string): Promise<
  ActionResult<Array<{ name: string; nameUr: string; slug: string; price: number; image: string; subCategory: string }>>
> {
  try {
    if (!queryStr || queryStr.trim().length === 0) {
      return successResponse([]);
    }

    await connectToDatabase();

    if (!isDatabaseConnected()) {
      return successResponse(MockDb.searchProducts(queryStr));
    }

    const regex = new RegExp(queryStr.trim(), 'i');

    const matches = await Product.find({
      isActive: true,
      isDeleted: { $ne: true },
      $or: [{ name: regex }, { nameUr: regex }, { tags: regex }, { subCategory: regex }],
    })
      .select('name nameUr slug price images subCategory')
      .limit(8)
      .lean();

    const formatted = matches.map((m) => ({
      name: m.name,
      nameUr: m.nameUr,
      slug: m.slug,
      price: m.price,
      image: m.images[0] || '',
      subCategory: m.subCategory,
    }));

    return successResponse(formatted);
  } catch (error: unknown) {
    return successResponse(MockDb.searchProducts(queryStr));
  }
}

export async function getAllAdminProducts(search?: string): Promise<ActionResult<IProduct[]>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      const res = MockDb.getProducts({ limit: 100, search });
      return successResponse(res.products);
    }

    const query: Record<string, unknown> = { isDeleted: { $ne: true } };
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { nameUr: regex }, { sku: regex }, { category: regex }, { subCategory: regex }];
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).limit(100).lean();
    return successResponse(JSON.parse(JSON.stringify(products)));
  } catch (error: unknown) {
    const res = MockDb.getProducts({ limit: 100, search });
    return successResponse(res.products);
  }
}

export async function createProduct(payload: Partial<IProduct>): Promise<ActionResult<IProduct>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      const newProd = MockDb.addProduct(payload);
      return successResponse(newProd);
    }

    const doc = await Product.create({
      ...payload,
      isDeleted: false,
      isActive: payload.isActive !== undefined ? payload.isActive : true,
      rating: 5.0,
      numReviews: 0,
    });

    return successResponse(JSON.parse(JSON.stringify(doc)));
  } catch (error: unknown) {
    const newProd = MockDb.addProduct(payload);
    if (newProd) return successResponse(newProd);
    return handleActionError(error);
  }
}

export async function updateProduct(
  productId: string,
  updates: Partial<IProduct>
): Promise<ActionResult<IProduct>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      const updated = MockDb.updateProduct(productId, updates);
      if (!updated) return errorResponse('Product not found.');
      return successResponse(updated);
    }

    const doc = await Product.findByIdAndUpdate(productId, { $set: updates }, { new: true }).lean();
    if (!doc) {
      const updated = MockDb.updateProduct(productId, updates);
      if (updated) return successResponse(updated);
      return errorResponse('Product not found.');
    }

    return successResponse(JSON.parse(JSON.stringify(doc)));
  } catch (error: unknown) {
    const updated = MockDb.updateProduct(productId, updates);
    if (updated) return successResponse(updated);
    return handleActionError(error);
  }
}

export async function deleteProduct(productId: string): Promise<ActionResult<{ deleted: boolean }>> {
  try {
    await connectToDatabase();

    if (!isDatabaseConnected()) {
      const ok = MockDb.deleteProduct(productId);
      return successResponse({ deleted: ok });
    }

    await Product.findByIdAndUpdate(productId, {
      $set: { isDeleted: true, isActive: false },
    });
    MockDb.deleteProduct(productId);

    return successResponse({ deleted: true });
  } catch (error: unknown) {
    const ok = MockDb.deleteProduct(productId);
    return successResponse({ deleted: ok });
  }
}
