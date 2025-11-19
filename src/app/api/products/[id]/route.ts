// // app/api/products/[id]/route.ts

// import { prisma } from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const product = await prisma.product.findUnique({
//       where: { id: params.id },
//       include: { category: true }
//     });
    
//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
    
//     return NextResponse.json(product);
//   } catch (error) {
//     console.error('GET product error:', error);
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
    
//     const product = await prisma.product.update({
//       where: { id: params.id },
//       data: body,
//       include: { category: true }
//     });
    
//     return NextResponse.json(product);
//   } catch (error) {
//     console.error('PUT product error:', error);
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     console.log('DELETE request for product id:', params.id);
    
//     // Check if product exists first
//     const existingProduct = await prisma.product.findUnique({
//       where: { id: params.id }
//     });
    
//     if (!existingProduct) {
//       console.log('Product not found:', params.id);
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }
    
//     // Delete the product
//     await prisma.product.delete({
//       where: { id: params.id }
//     });
    
//     console.log('Product deleted successfully:', params.id);
    
//     return NextResponse.json({ 
//       success: true, 
//       message: 'Product deleted successfully' 
//     });
//   } catch (error) {
//     console.error('DELETE product error:', error);
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

// app/api/products/[id]/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true }
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('GET product error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const body = await request.json();
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: body,
      include: { category: true }
    });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT product error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const productId = params.id;
    
    console.log('=== DELETE PRODUCT REQUEST ===');
    console.log('Product ID:', productId);
    console.log('ID type:', typeof productId);
    console.log('ID length:', productId?.length);
    
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });
    
    console.log('Existing product:', existingProduct ? 'Found' : 'Not found');
    
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id: productId }
    });
    
    console.log('Product deleted successfully:', deletedProduct.id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully',
      deletedProduct
    });
  } catch (error) {
    console.error('=== DELETE PRODUCT ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Full error:', error);
    
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ 
      error: message,
      details: String(error)
    }, { status: 500 });
  }
}