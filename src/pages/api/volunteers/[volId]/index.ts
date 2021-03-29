import { NextApiRequest, NextApiResponse } from "next";
import { getVolunteer, updateVolunteer } from "server/actions/Volunteer";
import errors from "utils/errors";
import { Volunteer, APIError } from "utils/types";
import constants from "utils/constants";
import formidable from "formidable";
import { FormatAlignLeft } from "@material-ui/icons";

// GET /api/volunteers/[volId] will return a single volunteer profile that matches the volId
// POST /api/volunteers/[volId] will take new form data and update basic account info

// @route   GET /api/volunteers/[volId] - Returns a single Volunteer object with _id of volId.
// @route   POST /api/volunteers/[volId] - Updates existing Volunteer object with _id of volId.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req || !req.query || !req.query.volId) {
            throw new Error("Need a volunteer id for this route.");
        }
        const id = req.query.volId as string;

        if (req.method == "GET") {
            const vol: Volunteer = await getVolunteer(id);
            res.status(200).json({
                success: true,
                payload: vol,
            });
        } else if (req.method == "POST") {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err: string, fields: formidable.Fields) => {
                try {
                    const newVol: Volunteer = (fields as unknown) as Volunteer;

                    // only a volunteer's email, name, and phone are available to change via admin edit form
                    // these are all strings, so no need to convert any input - fields are strings

                    await updateVolunteer(id, newVol);
                    res.status(200).json({
                        success: true,
                        payload: {},
                    });
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
