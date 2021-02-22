import { NextApiRequest, NextApiResponse } from "next";
import errors from "utils/errors";
import formidable from "formidable";
import { Event } from "utils/types";
import { addEvent, getEvents } from "server/actions/Event";

// formidable config
export const config = {
    api: {
        bodyParser: false,
    },
};

// @route   GET /api/events - Return a list of paginated events. - Public
// @route   POST /api/events - Create an event from form data. - Private
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const events: Array<Event> = await getEvents();

            res.status(200).json({
                success: true,
                payload: { events },
            });
        } else if (req.method === "POST") {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err: string, fields: formidable.Fields, files: formidable.Files) => {
                // fields includes everything but files
                const event: Event = (fields as unknown) as Event;
                console.log("eventInfo: ", event);

                // TODO check image size and upload to contentful

                await addEvent(event);
                res.status(200).json({
                    success: true,
                    payload: {},
                });
            });
        }
    } catch (error) {
        console.error(error instanceof Error && error);
        res.status(400).json({
            success: false,
            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
        });
    }
}
