import {
    addVolunteer,
    getVolunteer,
    markVolunteerNotPresent,
    markVolunteerPresent,
    registerVolunteerToEvent,
} from "server/actions/Volunteer";
import VolunteerSchema from "server/models/Volunteer";
import EventSchema from "server/models/Event";
import { Volunteer, Event } from "utils/types";

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

describe("registerVolunteerToEvent() tests", () => {
    const newVolunteer: Volunteer = {
        name: "John Smith",
        email: "jsmith@gmail.com",
        phone: "(931) 931-9319",
    };

    test("successful sign up", async () => {
        const eventId = "604d6730ca1c1d7fcd4fbdc9";
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbdd4", "604d6730ca1c1d7fcd4fbdd5"],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbdc2"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc3", "604d6730ca1c1d7fcd4fbdc4"],
        };
        const options = { new: true, upsert: true };

        // insert vol into this event and update vol's fields
        const updatedEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 5,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3", "604d6730ca1c1d7fcd4fbde0"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbdd4", "604d6730ca1c1d7fcd4fbdd5"],
        };
        const updatedVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbdc2", "604d6730ca1c1d7fcd4fbdc9"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc3", "604d6730ca1c1d7fcd4fbdc4"],
        };

        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findOneAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        // the return vals here don't matter, just doing so updateOne's dont get called
        EventSchema.updateOne = jest.fn().mockResolvedValue(mockVolunteer);
        VolunteerSchema.updateOne = jest.fn().mockResolvedValue(mockVolunteer);

        await registerVolunteerToEvent(newVolunteer, eventId);
        expect(EventSchema.findById).lastCalledWith(eventId);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findOneAndUpdate).lastCalledWith({ email: newVolunteer.email }, newVolunteer, options);
        expect(VolunteerSchema.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(EventSchema.updateOne).lastCalledWith({ _id: eventId }, updatedEvent);
        expect(EventSchema.updateOne).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.updateOne).lastCalledWith({ email: newVolunteer.email }, updatedVolunteer);
        expect(VolunteerSchema.updateOne).toHaveBeenCalledTimes(1);
    });

    test("event doesnt exist", async () => {
        expect.assertions(3);
        const mockEvent = undefined;
        const eventId = "604d6730ca1c1d7fcd4fbdc4";

        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        await expect(registerVolunteerToEvent(newVolunteer, eventId)).rejects.toThrowError("Event does not exist.");
        expect(EventSchema.findById).lastCalledWith(eventId);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
    });

    test("user already registered", async () => {
        expect.assertions(5);
        const eventId = "604d6730ca1c1d7fcd4fbdc4";
        const options = { new: true, upsert: true };
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc4",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbde0"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbdd4", "604d6730ca1c1d7fcd4fbdd5"],
        };

        // this volunteer is already in the registeredVolunteers array above
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbdc2"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc3", "604d6730ca1c1d7fcd4fbdc4"],
        };

        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findOneAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await expect(registerVolunteerToEvent(newVolunteer, eventId)).rejects.toThrowError(
            "The volunteer has already been registered to this event."
        );
        expect(EventSchema.findById).lastCalledWith(eventId);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findOneAndUpdate).lastCalledWith({ email: newVolunteer.email }, newVolunteer, options);
        expect(VolunteerSchema.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test("event already at capacity", async () => {
        expect.assertions(4);
        const eventId = "604d6730ca1c1d7fcd4fbdc4";
        // this event is already at capacity
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc4",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 4,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbde0"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbdd4", "604d6730ca1c1d7fcd4fbdd5"],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbdc2"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc3", "604d6730ca1c1d7fcd4fbdc4"],
        };

        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findOneAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await expect(registerVolunteerToEvent(newVolunteer, eventId)).rejects.toThrowError(
            "Event is at max volunteers."
        );
        expect(EventSchema.findById).lastCalledWith(eventId);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findOneAndUpdate).toHaveBeenCalledTimes(0);
    });
});

describe("markVolunteerPresent() tests", () => {
    test("successfully checked in", async () => {
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3", "604d6730ca1c1d7fcd4fbde0"],
            attendedVolunteers: [],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbdc9", "604d6730ca1c1d7fcd4fbbb1"],
            attendedEvents: [],
        };
        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVolunteer);
        EventSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await markVolunteerPresent(mockVolunteer._id!, mockEvent._id!);
        expect(EventSchema.findById).lastCalledWith(mockEvent._id);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findById).lastCalledWith(mockVolunteer._id);
        expect(VolunteerSchema.findById).toHaveBeenCalledTimes(1);
        expect(EventSchema.findByIdAndUpdate).lastCalledWith(mockEvent._id, {
            $pull: { registeredVolunteers: mockVolunteer._id },
            $push: { attendedVolunteers: mockVolunteer._id },
        });
        expect(EventSchema.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findByIdAndUpdate).lastCalledWith(mockVolunteer._id, {
            $pull: { registeredEvents: mockEvent._id },
            $push: { attendedEvents: mockEvent._id },
            $inc: { totalEvents: 1, totalHours: mockEvent.hours },
        });
        expect(VolunteerSchema.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    test("volunteer not registered", async () => {
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3"],
            attendedVolunteers: [],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbbb1"],
            attendedEvents: [],
        };
        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVolunteer);
        EventSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await expect(markVolunteerPresent(mockVolunteer._id!, mockEvent._id!)).rejects.toThrowError(
            "The volunteer is not registered for this event."
        );
        expect(EventSchema.findById).lastCalledWith(mockEvent._id);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findById).lastCalledWith(mockVolunteer._id);
        expect(VolunteerSchema.findById).toHaveBeenCalledTimes(1);
    });

    test("volunteer already checked in", async () => {
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbde0"],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbbb1"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc9"],
        };
        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVolunteer);
        EventSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await expect(markVolunteerPresent(mockVolunteer._id!, mockEvent._id!)).rejects.toThrowError(
            "The volunteer has already been checked in to this event."
        );
        expect(EventSchema.findById).lastCalledWith(mockEvent._id);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findById).lastCalledWith(mockVolunteer._id);
        expect(VolunteerSchema.findById).toHaveBeenCalledTimes(1);
    });
});

describe("markVolunteerNotPresent() tests", () => {
    test("successfully un-checked in", async () => {
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3"],
            attendedVolunteers: ["604d6730ca1c1d7fcd4fbde0"],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbbb1"],
            attendedEvents: ["604d6730ca1c1d7fcd4fbdc9"],
        };
        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVolunteer);
        EventSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await markVolunteerNotPresent(mockVolunteer._id!, mockEvent._id!);
        expect(EventSchema.findById).lastCalledWith(mockEvent._id);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findById).lastCalledWith(mockVolunteer._id);
        expect(VolunteerSchema.findById).toHaveBeenCalledTimes(1);
        expect(EventSchema.findByIdAndUpdate).lastCalledWith(mockEvent._id, {
            $pull: { attendedVolunteers: mockVolunteer._id },
            $push: { registeredVolunteers: mockVolunteer._id },
        });
        expect(EventSchema.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findByIdAndUpdate).lastCalledWith(mockVolunteer._id, {
            $pull: { attendedEvents: mockEvent._id },
            $push: { registeredEvents: mockEvent._id },
            $inc: { totalEvents: -1, totalHours: -1 * mockEvent.hours! },
        });
        expect(VolunteerSchema.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    test("volunteer not checked in", async () => {
        const mockEvent: Event = {
            _id: "604d6730ca1c1d7fcd4fbdc9",
            name: "February Spruce Up",
            description: "We are sprucing in February. Come spruce with us :)",
            caption: "It's spruce season",
            maxVolunteers: 10,
            volunteerCount: 4,
            location: "1234 Neyland Dr\nKnoxville, TN 37916",
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),
            startRegistration: new Date(Date.now()),
            endRegistration: new Date(Date.now()),
            hours: 3,
            image: {
                assetID: "aASDuiHWIDUOHWEff",
                url: "https://i.imgur.com/MrGY5EL.jpeg",
            },
            registeredVolunteers: ["604d6730ca1c1d7fcd4fbdd2", "604d6730ca1c1d7fcd4fbdd3", "604d6730ca1c1d7fcd4fbde0"],
            attendedVolunteers: [],
        };
        const mockVolunteer: Volunteer = {
            _id: "604d6730ca1c1d7fcd4fbde0",
            name: "John Smith",
            email: "jsmith@gmail.com",
            phone: "(931) 931-9319",
            totalEvents: 2,
            totalHours: 5,
            registeredEvents: ["604d6730ca1c1d7fcd4fbbb1", "604d6730ca1c1d7fcd4fbdc9", "604d6730ca1c1d7fcd4fbdc9"],
            attendedEvents: [],
        };
        EventSchema.findById = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findById = jest.fn().mockResolvedValue(mockVolunteer);
        EventSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockEvent);
        VolunteerSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(mockVolunteer);
        await expect(markVolunteerNotPresent(mockVolunteer._id!, mockEvent._id!)).rejects.toThrowError(
            "The volunteer is not checked in to this event."
        );
        expect(EventSchema.findById).lastCalledWith(mockEvent._id);
        expect(EventSchema.findById).toHaveBeenCalledTimes(1);
        expect(VolunteerSchema.findById).lastCalledWith(mockVolunteer._id);
        expect(VolunteerSchema.findById).toHaveBeenCalledTimes(1);
    });
});
