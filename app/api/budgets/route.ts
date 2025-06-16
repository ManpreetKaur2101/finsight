export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { month: 'desc' },
    });
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('❌ Error in GET /api/budgets:', error);
    return new NextResponse('Failed to fetch budgets', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, month, amount } = body;

    if (!category || !month || !amount) {
      return new NextResponse('Missing fields in request body', { status: 400 });
    }

    const budget = await prisma.budget.create({
      data: {
        category,
        month,
        amount: parseFloat(amount),
      },
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.error('❌ Error in POST /api/budgets:', error);
    return new NextResponse('Failed to create budget', { status: 500 });
  }
}
