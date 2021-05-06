import { Switch, TableCell } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { APIError, EventVolunteer } from "utils/types";
import urls from "utils/urls";

interface Props {
    eventId: string;
    eVol: EventVolunteer;
}

const VolAttendanceListItem: React.FC<Props> = ({ eventId, eVol }) => {
    const [present, setPresent] = useState(eVol.present);

    const toggleAttendance = async function () {
        const fetchOpts: RequestInit = {
            method: "POST",
            mode: "same-origin",
        };
        if (present) {
            const resp = await fetch(urls.baseUrl + urls.api.markNotPresent(eventId, eVol.volunteer._id!), fetchOpts);
            setPresent(false);
        } else {
            console.log("marking present");
            await fetch(urls.baseUrl + urls.api.markPresent(eventId, eVol.volunteer._id!), fetchOpts);
            setPresent(true);
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
