import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, description, date, category } = body;

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        description,
        date: new Date(date),
        category,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('❌ Error creating transaction:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
