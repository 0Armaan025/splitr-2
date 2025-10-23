// src/app/api/mock/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';

function makeId(prefix = 'ord') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', planName, billingCycle } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Simulate order creation
    const order = {
      id: makeId('mockorder'),
      amount,
      currency,
      planName,
      billingCycle,
      createdAt: Date.now(),
      status: 'created',
    };

    // In a real gateway you'd persist order server-side. Here it's ephemeral.
    return NextResponse.json({ order });
  } catch (err: any) {
    console.error('mock/create-order error', err);
    return NextResponse.json({ error: err.message || 'server error' }, { status: 500 });
  }
}
