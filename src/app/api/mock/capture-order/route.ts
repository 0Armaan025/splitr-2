// src/app/api/mock/capture-order/route.ts
import { NextRequest, NextResponse } from 'next/server';

function makePaymentId() {
  return `mockpay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, fakeCard } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    // Very basic "validation" of fake card
    const cardOk = typeof fakeCard?.number === 'string' && fakeCard.number.trim().length >= 12;


    // Simulate capture delay
    await new Promise((r) => setTimeout(r, 400));

    // For demo: determine tokensGranted based on orderId / pattern or we just map planName from orderId (not stored here)
    // To keep it simple: extract a price from orderId is impossible, so client should pass amount if needed.
    // We'll return a generic success and ask client to pass tokens mapping or the server could accept tokens param.
    // Simpler: we generate a paymentId and return success — the client will trust server tokens mapping (we can accept tokens too)
    const paymentId = makePaymentId();

    // If the client included tokensWanted, honor it. Otherwise return 0 tokens — but better if client sends tokens.
    // We'll accept optional tokensGranted in body.
    const body = await req.json().catch(() => ({} as any));
    const tokensGranted = body.tokensGranted ?? 0;

    // But since client didn't send tokens here above, let's attempt to parse from orderId or fallback.
    // To keep this robust, we will allow the client to pass tokensWanted in request; for now, if missing, return 0 and let frontend grant based on plan.
    return NextResponse.json({
      success: true,
      paymentId,
      tokensGranted,
    });
  } catch (err: any) {
    console.error('mock/capture-order error', err);
    return NextResponse.json({ error: err.message || 'server error' }, { status: 500 });
  }
}
