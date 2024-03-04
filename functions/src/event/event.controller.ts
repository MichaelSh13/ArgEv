import {
  CreateEventI,
  DeleteEventI,
  UpdateEventI,
  eventCreateSchema,
  eventDeleteSchema,
  eventUpdateSchema,
} from "./event.scheme";
import * as eventService from "./event.service";
import { HttpsError, onCall } from "firebase-functions/v2/https";
// TODO: Add to eslind removing not used imports;
// TODO: Add to eslind marking import as type where its need;

export const onCreateEvent = onCall(async ({ data, auth }) => {
  if (!auth) {
    throw new HttpsError("unauthenticated", "You are not authorized.");
  }

  let createData: CreateEventI;
  try {
    createData = eventCreateSchema.parse(data?.event) as CreateEventI;
  } catch (error) {
    throw new HttpsError(
      "invalid-argument",
      "Validation failed: Invalid data provided.",
    );
  }

  try {
    const eventId = await eventService.createEvent(createData, auth.uid);

    return { eventId, message: "Event created successfully." };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw error;
    }

    console.error("Error creating event:", error);
    throw new HttpsError("unknown", "Something went wrong.");
  }
});

export const onUpdateEvent = onCall(async ({ data, auth }) => {
  try {
    if (!auth) {
      throw new HttpsError("unauthenticated", "You are not authorized.");
    }

    let updateData: UpdateEventI;
    try {
      updateData = eventUpdateSchema.parse(data?.event);
    } catch (error) {
      throw new HttpsError(
        "invalid-argument",
        "Validation failed: Invalid data provided.",
      );
    }

    const eventId = await eventService.updateEvent(
      updateData.id,
      updateData.data,
      auth.uid,
    );

    return { eventId, message: "Event updated successfully." };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw error;
    }

    console.error("Error updating event:", error);
    throw new HttpsError("unknown", "Something went wrong.");
  }
});

export const onDeleteEvent = onCall(async ({ data, auth }) => {
  try {
    if (!auth) {
      throw new HttpsError("unauthenticated", "You are not authorized.");
    }

    let deleteData: DeleteEventI;
    try {
      deleteData = eventDeleteSchema.parse(data?.event);
    } catch (error) {
      throw new HttpsError(
        "invalid-argument",
        "Validation failed: Invalid data provided.",
      );
    }

    const message = await eventService.deleteEvent(deleteData.id, auth.uid);

    return { message };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw error;
    }

    console.error("Error deleting event:", error);
    throw new HttpsError("unknown", "Something went wrong.");
  }
});
