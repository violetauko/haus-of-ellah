// import { prisma } from '@/lib/prisma';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const categories = await prisma.category.findMany({
//       include: { _count: { select: { products: true } } }
//     });
//     return NextResponse.json(categories);
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'An error occurred';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, slug } = body;
    
//     const category = await prisma.category.create({
//       data: { name, slug }
//     });
    
//     return NextResponse.json(category);
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'An error occurred';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } }
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;
    
    const category = await prisma.category.create({
      data: { name, slug }
    });
    
    return NextResponse.json(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}