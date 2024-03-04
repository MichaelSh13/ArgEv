import * as admin from "firebase-admin";
admin.initializeApp();

export * from "./event/index";

// import { firestore } from "firebase-functions";
// import * as admin from "firebase-admin";

// admin.initializeApp();

// HTTP Cloud Function
// export const helloWorld = onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
// // HTTP Cloud Function
// export const helloWorld2 = onRequest((request, response) => {
//   response.send("Hello from Firebase 2!");
// });

// Callable Cloud Function
// export const callableHelloWorld = onCall(() => {
//   return { message: "Hello from Firebase!" };
// });

// export const lowerCaseBio = firestore
//   .document("animals/{animalId}")
//   .onCreate(async (snap, context) => {
//     try {
//       const data = snap.data();
//       const bio = data.bio.toLowerCase();

//       // Create a new document with the same ID
//       await admin.firestore().doc(`animals/${snap.id}`).set({ bio });

//       console.log("Bio updated successfully:", bio);
//     } catch (error) {
//       console.error("Error updating document:", error);
//     }
//   });

// export const makePayment = onRequest((req, res) => {
//   if (!req.body.card) {
//     res.send("Missing card!");
//   } else {
//     res.send("Payment processed!");
//   }
// });
