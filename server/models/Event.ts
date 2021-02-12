import { model, models, Schema } from "mongoose";
import ContentfulImageSchema from "./ContentfulImageSchema";

export const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: ContentfulImageSchema,
        required: false,
    }
});

export default models?.Event ?? model("Event", EventSchema);
