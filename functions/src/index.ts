// import { onUserCreated } from "firebase-functions/v2/auth";
// import { initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// initializeApp();
// const db = getFirestore();

// export const createUserProfile = onUserCreated(async (event) => {
//   const user = event.data;

//   await db.collection("users").doc(user.uid).set({
//     email: user.email,
//     displayName: user.displayName ?? "",
//     photoURL: user.photoURL ?? null,
//     createdAt: new Date(),
//   });
// });
