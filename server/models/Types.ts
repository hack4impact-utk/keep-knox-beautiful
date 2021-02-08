import { ObjectID } from "mongodb";

export interface Types {
  _id: ObjectID;
  name: string;
  description?: string;
  date?: Date;
  start_time?: Date;
  end_time?: Date;
  location?: string;
  start_registration?: boolean;
  end_registration?: boolean;
  hours?: number;
  image?: File;
  registered_attendees?: Array<string>;
  present_attendees?: Array<string>;
  absent_attendees?: Array<string>;
}
