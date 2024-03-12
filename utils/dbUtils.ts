import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

interface TimesheetEvent {
  startTime: string;
  endTime: string;
  eventName: string;
  activity: string;
}

const env = await load();
const username = env["MONGO_USERNAME"];
const password = env["PASSWORD"];

const uri =
  `mongodb+srv://${username}:${password}@dpo.hlrbfsz.mongodb.net/?retryWrites=true&w=majority&appName=DPO`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
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
// run().catch(console.dir);

export async function establishConnection(dbName: string) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return client.db(dbName);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function findUserByEmail(email: string) {
  try {
    await client.connect();
    const database = client.db("users");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const users = database.collection("users");
    const user = await users.findOne(
      { email },
    );
    return user;
  } finally {
    // await client.close();
  }
}

export async function findTimesheetById(timesheetId: string) {
  // console.log(timesheetId);
  if (timesheetId && timesheetId !== "today") {
    try {
      await client.connect();
      const database = client.db("timesheets");
      // Specifying a Schema is always optional, but it enables type hinting on
      // finds and inserts
      const timesheets = database.collection("timesheets");
      console.log(!!timesheets, timesheetId);
      const timesheetObjectId = new ObjectId("65ef694a05f310ac5a76bbf6".toString());
      const timesheet = await timesheets.findOne(
        { _id: timesheetObjectId },
      );
      console.log(timesheet);
      return timesheet;
    } finally {
      // await client.close();
    }
  }
}

export async function createNewTimesheet(initialEvent: TimesheetEvent) {
  try {
    await client.connect();
    const database = client.db("timesheets");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const timesheets = database.collection("timesheets");
    // console.log(id);
    const timesheet = await timesheets.insertOne(
      { events: [initialEvent] },
    );
    // console.log(timesheet);
    return timesheet;
  } finally {
    // await client.close();
  }
}

export async function addEventToTimesheet(
  timesheetId: string,
  timesheetEvent: TimesheetEvent,
) {
  try {
    await client.connect();
    const database = client.db("timesheets");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const timesheets = database.collection("timesheets");
    const timesheetObjectId = new ObjectId(timesheetId.toString());
    const timesheet = await timesheets.findOne(
      { _id: timesheetObjectId },
    );
    if (timesheet) {
      timesheet.events.push(timesheetEvent);
      timesheet.save();
    }
    // console.log(timesheet);
    return timesheet;
  } finally {
    // await client.close();
  }
}
