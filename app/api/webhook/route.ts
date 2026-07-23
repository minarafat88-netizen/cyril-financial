import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore"; // تم التصحيح هنا

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    const event = JSON.parse(body);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const applicationId = paymentIntent.metadata?.applicationId;

        if (applicationId) {
          try {
            // تحديث حالة الطلب في Firebase Firestore
            const appRef = doc(db, "applications", applicationId);
            await updateDoc(appRef, {
              status: "FEE_PAID_UNDERWRITING",
              updatedAt: new Date().toISOString(),
            });
          } catch (err) {
            console.error("Error updating application status from webhook:", err);
          }
        }
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}