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
  } finally {
    await client.close();
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
      await client.close();
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
      if (user) {
        return user.timesheets[dateString];
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
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
    const timesheetKey = dateString;
    const timesheet = await timesheets.insertOne(
      { events: [initialEvent], timesheetKey },
    );
    return timesheet;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

export async function addTimesheetToUser(
  timesheetId: ObjectId,
  timesheetKey: string,
) {
  try {
    const database = client.db("users");

    const users = database.collection("users");

    const filter = { email: userEmail.value };
    // update the value of the 'quantity' field to 5
    const key = "timesheets." + timesheetKey;
    const updateDocument = {
      $set: {
        [key]: timesheetId,
      },
    };
    const res = await users.updateOne(filter, updateDocument);
    return res
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
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
    const timesheet = await timesheets.findOne(
      { _id: timesheetObjectId },
    );
    if (timesheet) {
      timesheet.events.push(timesheetEvent);
      timesheet.save();
    }
    return timesheet;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
