import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, slug } = body;
    
    const category = await prisma.category.update({
      where: { id: params.id },
      data: { name, slug }
    });
    
    return NextResponse.json(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { _count: { select: { products: true } } }
    });
    
    if (category && category._count.products > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with products. Please delete or reassign products first.' },
        { status: 400 }
      );
    }
    
    await prisma.category.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}