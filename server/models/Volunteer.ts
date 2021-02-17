import { model, models, Model, Schema, Document } from "mongoose";
import { Event, Volunteer } from "utils/types";

export const VolunteerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    filledForm: {
        type: Boolean,
        required: true,
    },
    attendedEvents: {
        type: [Event],
        required: false,
    },
    signedUpEvents: {
        type: [Event],
        required: false,
    },
});

export interface VolunteerDocument extends Omit<Volunteer, "_id">, Document {}

export default (models.User as Model<VolunteerDocument>) || model<VolunteerDocument>("Volunteer", VolunteerSchema);
