import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { applications as applicationsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

// تهيئة Stripe باستخدام المفتاح السري
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    // التحقق من صحة الـ Webhook باستخدام مكتبة Stripe الرسمية
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const applicationId = paymentIntent.metadata.applicationId;

        if (!applicationId) {
          console.warn("Webhook received payment_intent.succeeded without an applicationId in metadata.");
          break;
        }

        // تحديث حالة الطلب في قاعدة البيانات باستخدام Drizzle
        await db
          .update(applicationsTable)
          .set({
            // Use a typed cast to bypass strict generated types when necessary
            // Ensure the fields exist in your schema. Adjust keys if different.
            status: "FEE_PAID_UNDERWRITING",
            updatedAt: new Date(),
          } as any)
          .where(eq(applicationsTable.id, Number(applicationId)));

        console.log(`Webhook: Successfully updated application ID ${applicationId} to FEE_PAID_UNDERWRITING.`);
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing failed:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}