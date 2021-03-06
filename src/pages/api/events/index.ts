import { NextApiRequest, NextApiResponse } from "next";
import errors from "utils/errors";
import formidable, { File } from "formidable";
import { Event, APIError } from "utils/types";
import constants from "utils/constants";
import { addEvent, getCurrentEvents, getPastEventsAdmin } from "server/actions/Event";
import { uploadImage } from "server/actions/Contentful";
import authenticate from "server/actions/Authenticate";

// formidable config
export const config = {
    api: {
        bodyParser: false,
    },
};

// @route   GET /api/events - For pagianted queries, return a LoadMorePagination
//   type that contains a list of events and whether its the last page. Returns an
//   array of events for all unpaginated queries. Use `type` param to declare
//   what type of events to return. - Public
// @route   POST /api/events - Create an event from form data. - Private
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const type = req.query.type;
            const page = req.query.page ? Number(req.query.page) : 1;
            const search = req.query.search ? new Date(req.query.search as string) : undefined;

            if (type == "current") {
                // shouldn't use this API route in prod since the events are pre-fetched
                //   with getServerSideProps and displayed statically on page
                const events = await getCurrentEvents();
                res.status(200).json({
                    success: true,
                    payload: events,
                });
            } else if (type == "past") {
                // will be used since we paginate admin's page events
                const loadMorePaginatedEvents = await getPastEventsAdmin(page, search);
                res.status(200).json({
                    success: true,
                    payload: loadMorePaginatedEvents,
                });
            } else {
                throw new APIError(400, "Invalid query parameter `type`.");
            }
        } else if (req.method === "POST") {
            authenticate(req, res);

            const form = new formidable.IncomingForm();
            form.parse(req, async (err: string, fields: formidable.Fields, files: formidable.Files) => {
                try {
                    // fields includes everything but files
                    const event: Event = (fields as unknown) as Event;
                    const file: File = files?.image as File;

                    // fields are strings so convert the numbers
                    event.hours = Number(event?.hours);
                    event.maxVolunteers = event?.maxVolunteers ? Number(event?.maxVolunteers) : undefined;
                    event.groupSignUp = fields["groupSignUp"] === "true";

                    if (file) {
                        if (file?.size > constants.contentfulImageLimit) {
                            throw new APIError(400, "Image too large.");
                        }

                        event.image = await uploadImage(file);
                    }

                    await addEvent(event);
                    res.status(200).json({
                        success: true,
                        payload: {},
                    });
                } catch (error) {
                    // dont know of a cleaner way to do this
                    if (error instanceof APIError) {
                        res.status(error.statusCode).json({
                            success: false,
                            message: error.message,
                        });
                    } else {
                        console.error(error instanceof Error && error);
                        res.status(500).json({
                            success: false,
                            message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
                        });
                    }
                }
            });
        }
    } catch (error) {
        if (error instanceof APIError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        } else {
            console.error(error instanceof Error && error);
            res.status(500).json({
                success: false,
                message: (error instanceof Error && error.message) || errors.GENERIC_ERROR,
            });
        }
    }
}
