import functions from "firebase-functions-test";

// export const createTestEnv = () =>
//   functions(
//     // TODO!: get data from some ENV!
//     {
//       databaseURL:
//         "https://argev-3af51-default-rtdb.europe-west1.firebasedatabase.app",
//       storageBucket: "argev-3af51.appspot.com",
//       projectId: "argev-3af51",
//     },
//     "firebase.config.json",
//   );
export const createTestEnv = () => functions();
