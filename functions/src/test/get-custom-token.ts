import { auth } from "firebase-admin";

/**
 *
 *
 * @export
 * @param {string} uid
 * @return {*}
 */
export async function getCustomToken(uid: string) {
  try {
    const customToken = await auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error("Error creating custom token:", error);
    throw error;
  }
}
