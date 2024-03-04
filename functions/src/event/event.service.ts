import * as admin from "firebase-admin";
import { CreateEventI } from "./event.scheme";

export const createEvent = async (
  createEventData: CreateEventI,
  createdBy: string,
) => {
  const eventData = {
    ...createEventData,
    createdBy,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await admin.firestore().collection("events").add(eventData);
  return docRef.id;
};

export const updateEvent = async (
  eventId: string,
  updatedEventData: Partial<CreateEventI>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId: string,
) => {
  // Check if the user has permission to update the event
  // You may need to implement additional permission checks based
  // on your requirements
  const eventRef = admin.firestore().collection("events").doc(eventId);

  await eventRef.update({
    ...updatedEventData,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return "Event updated successfully.";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteEvent = async (eventId: string, userId: string) => {
  // Check if the user has permission to delete the event
  // You may need to implement additional permission checks based
  // on your requirements

  const eventRef = admin.firestore().collection("events").doc(eventId);

  await eventRef.delete();

  return "Event deleted successfully.";
};
