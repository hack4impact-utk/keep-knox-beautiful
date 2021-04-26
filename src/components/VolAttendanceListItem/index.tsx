import { Switch, TableCell } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { markVolunteerPresent, markVolunteerNotPresent } from "server/actions/Volunteer";
import { Event, EventVolunteer } from "utils/types";
import urls from "utils/urls";

interface Props {
    event: Event;
    eVol: EventVolunteer;
}

const VolAttendanceListItem: React.FC<Props> = ({ event, eVol }) => {
    const [present, setPresent] = useState(eVol.present);
    const router = useRouter();

    const toggleAttendance = async function () {
        const fetchOpts: RequestInit = {
            method: "POST",
            mode: "same-origin",
        };
        if (present) {
            setPresent(false);
            await fetch(urls.api.markNotPresent(event._id!, eVol.volunteer._id!), fetchOpts);
        } else {
            setPresent(true);
            await fetch(urls.api.markPresent(event._id!, eVol.volunteer._id!), fetchOpts);
        }
    };
    return (
        <React.Fragment>
            <TableCell>{eVol.volunteer.name}</TableCell>
            <TableCell align="right">
                <Switch
                    onClick={toggleAttendance}
                    checked={present}
                    name="presentSwitch"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                />
            </TableCell>
        </React.Fragment>
    );
};

export default VolAttendanceListItem;
