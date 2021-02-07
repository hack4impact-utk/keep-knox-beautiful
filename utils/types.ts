import { ObjectID } from "mongodb";

// Keep these in sync with the backend schema

export interface User {
  _id?: ObjectID;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  filledForm?: boolean;
  // attendedEvents?: Array<Event>;
  // signedUpEvents?: Array<Event>;
}
