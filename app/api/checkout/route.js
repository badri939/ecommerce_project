import { NextResponse } from "next/server";
import admin from "firebase-admin";
import serviceAccount from "@/serviceAccountKey.json";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

export async function POST(request) {
  try {
    const { cart, totalCost } = await request.json();
    const authHeader = request.headers.get("authorization");

    console.log("Incoming request payload:", { cart, totalCost });
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    const order = {
      id: Date.now(),
      items: cart,
      total: totalCost,
      date: new Date().toISOString(),
    };

    const userRef = db.collection("users").doc(decodedToken.uid);
    await userRef.update({
      orderHistory: admin.firestore.FieldValue.arrayUnion(order),
      invoices: admin.firestore.FieldValue.arrayUnion({
        id: order.id,
        date: order.date,
        total: order.total,
      }),
    });

    const orderRef = db.collection("orders").doc(order.id.toString());
    await orderRef.set(order);

    return NextResponse.json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error processing checkout:", error);
    return NextResponse.json({ error: "Failed to process checkout." }, { status: 500 });
  }
}