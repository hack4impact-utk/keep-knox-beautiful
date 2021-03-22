import { NextApiRequest, NextApiResponse } from "next";
import { markVolunteerPresent } from "server/actions/Volunteer";
import errors from "utils/errors";
import { APIError } from "utils/types";

// GET /api/events/[eventId]/present/[volId] will mark volunteer volId as present for event eventId
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req || !req.query || !req.query.eventId || !req.query.volId) {
            throw new Error("Need an event id a volunteer id for this route.");
        }

        if (req.method == "GET") {
            const eventId = req.query.eventId as string;
            const volId = req.query.volId as string;

            await markVolunteerPresent(volId, eventId);
            res.status(200).json({
                success: true,
                payload: {},
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
