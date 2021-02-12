import { ObjectID } from "mongodb";

// Keep these in sync with the backend schema

export interface User {
    _id?: ObjectID;
    email?: string;
    name?: string;
    phone?: string;
    filledForm?: boolean;
    attendedEvents?: Array<Event>;
    signedUpEvents?: Array<Event>;
}
export interface Event {
    _id?: ObjectID;
    name?: string;
    description?: string;
    date: Date;
    start_time: Date;
    end_time: Date;
    location: string;
    start_registration: Date;
    end_registration: Date;
    hours: number;
    image: string;
    registered_attendees: Array<string>;
    present_attendees: Array<string>;
    absent_attendees: Array<string>;
}