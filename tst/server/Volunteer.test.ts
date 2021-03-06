import { addVolunteer, getVolunteer } from "server/actions/Volunteer";
import VolunteerSchema from "server/models/Volunteer";
import { Volunteer } from "utils/types";

jest.mock("server");

// Begin getVolunteer test cases
describe("getVolunteer() tests", () => {
    test("valid volunteer", async () => {
        const mockVol = {
            email: "test",
            name: "test",
            phone: "123-123-1234",
        };

        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVol);
        await expect(getVolunteer("602734007d7de15fae321153")).resolves.toEqual(mockVol);
    });

    test("invalid parameters", async () => {
        expect.assertions(1);
        await expect(getVolunteer("")).rejects.toThrowError("Invalid id");
    });

    test("no event with that id", async () => {
        expect.assertions(1);
        const mockVol = undefined;

        VolunteerSchema.findById = jest.fn().mockReturnValue(mockVol);
        await expect(getVolunteer("602734007d7de15fae321152")).rejects.toThrowError("Volunteer does not exist");
    });
});

// Begin addVolunteer test cases
describe("addVolunteer() tests", () => {
    test("valid volunteer", async () => {
        const mockVol: Volunteer = {
            email: "test",
            name: "test",
            phone: "123-123-1234",
            // filledForm: false,
            // attendedEvents and signedUpEvents default to empty arrays in mongoose
        };

        VolunteerSchema.create = jest.fn().mockImplementation(async (vol: Volunteer) => vol);

        /* eslint @typescript-eslint/unbound-method: "off" */
        await addVolunteer(mockVol);
        expect(VolunteerSchema.create).lastCalledWith(mockVol);
        expect(VolunteerSchema.create).toHaveBeenCalledTimes(1);
    });
});
