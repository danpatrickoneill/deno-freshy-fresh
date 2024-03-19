import { MongoClient, ObjectId } from "npm:mongodb@6";
import { userEmail } from "./userUtils.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

const username = Deno.env.get("MONGO_USERNAME");
const password = Deno.env.get("PASSWORD");

const uri =
  `mongodb+srv://${username}:${password}@dpo.hlrbfsz.mongodb.net/?retryWrites=true&w=majority&appName=DPO`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function findUserByEmail() {
  try {
    await client.connect();
    const database = client.db("users");

    const users = database.collection("users");
    const user = await users.findOne(
      { email: userEmail },
    );
    return user;
  } catch (e) {
    console.log(e);
  }
}

export async function findTimesheetById(timesheetId: string) {
  if (timesheetId && timesheetId !== "undefined") {
    try {
      await client.connect();
      const database = client.db("timesheets");

      const timesheets = database.collection("timesheets");
      const timesheetObjectId = new ObjectId(
        timesheetId.toString(),
      );
      const timesheet = await timesheets.findOne(
        { _id: timesheetObjectId },
      );

      return timesheet;
    } catch (e) {
      console.log(e);
    } finally {
      // await client.close();
    }
  }
}

export async function findTimesheetForUser(dateString: string) {
  if (dateString) {
    try {
      await client.connect();
      const database = client.db("users");

      const users = database.collection("users");
      const user = await users.findOne(
        { email: userEmail.value },
      );
      console.log(userEmail.value);

      if (user) {
        return user.timesheets[dateString];
      }
    } catch (e) {
      console.log(e);
    } finally {
      // await client.close();
    }
  }
}

export async function createNewTimesheet(
  initialEvent: TimesheetEvent,
  dateString: string,
) {
  try {
    await client.connect();
    const database = client.db("timesheets");

    const timesheets = database.collection("timesheets");
    const timesheet = await timesheets.insertOne(
      { events: [initialEvent] },
    );
    return timesheet;
  } catch (e) {
    console.log(e);
  }
}

export async function addTimesheetToUser(
  timesheetId: ObjectId,
  dateString: string,
) {
  try {
    await client.connect();
    const database = client.db("users");

    const users = database.collection("users");

    const filter = { email: userEmail.value };
    const key = "timesheets." + dateString;
    const updateDocument = {
      $set: {
        [key]: timesheetId,
      },
    };
    const res = await users.updateOne(filter, updateDocument);
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function addEventToTimesheet(
  timesheetId: string,
  timesheetEvent: TimesheetEvent,
) {
  try {
    await client.connect();
    const database = client.db("timesheets");

    const timesheets = database.collection("timesheets");
    const timesheetObjectId = new ObjectId(timesheetId.toString());
    const filter = { _id: timesheetObjectId };
    const updateDocument = {
      $push: {
        "events": timesheetEvent,
      },
    };
    const res = await timesheets.updateOne(filter, updateDocument);
    console.log(res);
    console.log(149);
    return res;
  } catch (e) {
    console.log(e);
  }
}
