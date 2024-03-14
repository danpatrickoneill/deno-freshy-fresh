import { MongoClient, ObjectId } from "npm:mongodb@6";
// import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts";

interface TimesheetEvent {
  start: string;
  end: string;
  name: string;
  activity: string;
}

// const env = await load();
const username = Deno.env.get("MONGO_USERNAME");
const password = Deno.env.get("PASSWORD")

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
  console.log(67, timesheetId);
  if (timesheetId && timesheetId !== "undefined") {
    try {
      await client.connect();
      const database = client.db("timesheets");
      // Specifying a Schema is always optional, but it enables type hinting on
      // finds and inserts
      const timesheets = database.collection("timesheets");
      console.log(!!timesheets, timesheetId);
      const timesheetObjectId = new ObjectId(
        timesheetId.toString(),
      );
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

export async function findTimesheetForUser(timestamp: string) {
  console.log(92, timestamp);
  if (timestamp) {
    try {
      await client.connect();
      const database = client.db("users");
      // Specifying a Schema is always optional, but it enables type hinting on
      // finds and inserts
      const users = database.collection("users");
      const user = await users.findOne(
        { email: "test@test.com" },
      );
      if (user) {
        console.log(user);
        return user.timesheets[timestamp];
      }
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
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const timesheets = database.collection("timesheets");
    // console.log(id);
    const timesheetKey = dateString;
    console.log(100, timesheetKey);
    const timesheet = await timesheets.insertOne(
      { events: [initialEvent], timesheetKey },
    );
    // console.log(timesheet);
    return timesheet;
  } finally {
    // await client.close();
  }
}

export async function addTimesheetToUser(
  timesheetId: ObjectId,
  userEmail: any,
) {
  try {
    const database = client.db("users");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const users = database.collection("users");

    const timesheetKey = getStandardizedMonthDayYearKeyFromSelectedDate();
    const filter = { email: "test@test.com" };
    // update the value of the 'quantity' field to 5
    const key = "timesheets." + timesheetKey;
    console.log(126, key);
    const updateDocument = {
      $set: {
        [key]: timesheetId,
      },
    };
    const res = await users.updateOne(filter, updateDocument);
    console.log(res);
  } catch (e) {
    console.log(e);
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
