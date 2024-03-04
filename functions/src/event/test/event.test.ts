// import { onCreateEvent } from "..";
// import * as admin from "firebase-admin";
// import serviceAccount from "../../../firebase.config.json";
// import { CreateEventI, DeleteEventI, UpdateEventI } from "../event.scheme";
// import { createTestEnv } from "../../test/create-test-env";
// import { getCustomToken } from "../../test/get-custom-token";
// import { onDeleteEvent, onUpdateEvent } from "../event.controller";

// const testEnv = createTestEnv();

// beforeAll(() => {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   });
// });
// // clean db after each

// describe("onCreateEvent", () => {
//   test("it should create event", async () => {
//     const uid = "EzO5UcQrlCKl9ZXZxHnIODqULoxU";
//     const token = await getCustomToken(uid);

//     const context = {
//       auth: {
//         token,
//         uid,
//       },
//       data: {
//         event: {
//           title: "Title",
//           description: "Description",
//         } as CreateEventI,
//       },
//     };

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     const event = await testEnv.wrap(onCreateEvent)(context);

//     expect(event?.eventId?.length).toBeGreaterThan(0);
//   });
// });

// describe("onUpdateEvent", () => {
//   let eventId: string;
//   beforeEach(async () => {
//     // creat better way
//     const uid = "EzO5UcQrlCKl9ZXZxHnIODqULoxU";
//     const token = await getCustomToken(uid);

//     const context = {
//       auth: {
//         token,
//         uid,
//       },
//       data: {
//         event: {
//           title: "Title",
//           description: "Description",
//         } as CreateEventI,
//       },
//     };

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     const event = await testEnv.wrap(onCreateEvent)(context);

//     eventId = event.eventId;
//   });

//   test("it should update event", async () => {
//     const uid = "EzO5UcQrlCKl9ZXZxHnIODqULoxU";
//     const token = await getCustomToken(uid);

//     const context = {
//       auth: {
//         token,
//         uid,
//       },
//       data: {
//         event: {
//           id: eventId,
//           data: {
//             description: "Description 2",
//           },
//         } as UpdateEventI,
//       },
//     };

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     const event = await testEnv.wrap(onUpdateEvent)(context);

//     expect(event?.eventId?.length).toBeGreaterThan(0);
//   });
// });

// describe("onDeleteEvent", () => {
//   let eventId: string;
//   beforeEach(async () => {
//     // creat better way
//     const uid = "EzO5UcQrlCKl9ZXZxHnIODqULoxU";
//     const token = await getCustomToken(uid);

//     const context = {
//       auth: {
//         token,
//         uid,
//       },
//       data: {
//         event: {
//           title: "Title",
//           description: "Description",
//         } as CreateEventI,
//       },
//     };

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     const event = await testEnv.wrap(onCreateEvent)(context);

//     eventId = event.eventId;
//   });

//   test("it should delete event", async () => {
//     const uid = "EzO5UcQrlCKl9ZXZxHnIODqULoxU";
//     const token = await getCustomToken(uid);

//     const context = {
//       auth: {
//         token,
//         uid,
//       },
//       data: {
//         event: {
//           id: eventId,
//         } as DeleteEventI,
//       },
//     };

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     const event = await testEnv.wrap(onDeleteEvent)(context);

//     // TODO: Check existing entity in DB also.
//     expect(event?.message).toBe("Event deleted successfully.");
//   });
// });

import * as admin from "firebase-admin";
import { UpdateEventI } from "../event.scheme";
import { createTestEnv } from "../../test/create-test-env";
import { onUpdateEvent } from "../event.controller";
import type { WrappedV2Function } from "firebase-functions-test/lib/v2";
import { CloudEvent } from "firebase-functions/v2";
import { CallableRequest } from "firebase-functions/v2/https";

const testEnv = createTestEnv();

const projectId = "sample" + new Date().getTime();
admin.initializeApp({ projectId, databaseURL: "http://localhost:9002" });

const db = admin.firestore();

describe("desc", () => {
  const eventRef = db.collection("event").doc("event1");

  let wrapped: WrappedV2Function<CloudEvent<UpdateEventI>>;
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    wrapped = testEnv.wrap(onUpdateEvent);
  });

  beforeEach(async () => {
    console.log("before clear");
    try {
      await testEnv.firestore.clearFirestoreData({ projectId });
    } catch (error) {
      console.log(error);
      throw error;
    }
    console.log("after clear");
  });

  let initialData: UpdateEventI["data"];
  beforeEach(async () => {
    console.log("before init");

    initialData = {
      title: "Initial Title",
      description: "Initial Description",
    };

    await eventRef.set(initialData);
    console.log("after init");
  });

  let context: CallableRequest<UpdateEventI>;
  beforeEach(() => {
    context = {
      data: {
        id: "",
        data: {},
      },
      auth: {
        uid: "testUid",
      },
    } as CallableRequest<UpdateEventI>;
  });

  it("test", async () => {
    console.log("sdkfskdfkskdfkskdf");
    console.log("sdkfskdfkskdfkskdf");
    console.log("sdkfskdfkskdfkskdf");
    console.log("sdkfskdfkskdfkskdf");

    await wrapped(context);

    // here need to check if entity updated in db
    expect(true).toBe(true);
  });
});
