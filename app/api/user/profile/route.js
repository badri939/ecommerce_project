import { NextResponse } from "next/server";
import admin from "firebase-admin";
import serviceAccount from "../../../../serviceAccountKey.json";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Initialize Firestore
const db = getFirestore();

export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Fetch user data from Firestore
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    let userData;

    if (userDoc.exists) {
      // User exists in Firestore
      userData = userDoc.data();
    } else {
      // User does not exist, create a new record
      userData = {
        name: decodedToken.name || "Unknown User",
        email: decodedToken.email,
        orderHistory: [],
        invoices: [],
      };
      await userRef.set(userData);
    }

    // Fetch order history and invoices dynamically
    const orderHistory = userData.orderHistory || [];
    const invoices = userData.invoices || [];

    return NextResponse.json({
      name: userData.name,
      email: userData.email,
      orderHistory,
      invoices,
    });
  } catch (error) {
    console.error("Token verification failed or Firestore error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}