import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { Event, Volunteer, EventVolunteer } from "utils/types";
import UpsertEvent from "src/components/UpsertEvent";
import { getEvent, getEventWithVolFields } from "server/actions/Event";
import {
    Container,
    Grid,
    TextField,
    InputAdornment,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    makeStyles,
    Theme,
    createStyles,
    Switch,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import colors from "src/components/core/colors";
import urls from "utils/urls";
import { markVolunteerNotPresent, markVolunteerPresent } from "server/actions/Volunteer";
import VolAttendanceListItem from "src/components/VolAttendanceListItem";

interface Props {
    event: Event;
}

function orderVolunteers(vols: Volunteer[]): Volunteer[] {
    return vols
        ? vols.sort((v1, v2) => {
              // sorry typescript, need to sort
              return Number(v1.name) - Number(v2.name);
          })
        : [];
}

const ManageVolunteers: NextPage<Props> = ({ event }) => {
    const styles = useStyles();
    // unchecked-in vols first, so that its easier to quickly
    // sign people in. after that, it orders them alphabetically
    // b/c were nice also this uses a custom interface to know keep
    // track if the vol is checked in
    const uncheckedOrdered = orderVolunteers(event.registeredVolunteers as Volunteer[]).map(
        (vol: Volunteer): EventVolunteer => ({ volunteer: vol, present: false })
    );
    const checkedOrdered = orderVolunteers(event.attendedVolunteers as Volunteer[]).map(
        (vol: Volunteer): EventVolunteer => ({ volunteer: vol, present: true })
    );
    const eventVols = [...uncheckedOrdered, ...checkedOrdered];

    return (
        <Container maxWidth="xl" className={styles.container}>
            <Grid container direction="row" spacing={6} justify="center">
                <Grid item xs={10} md={8} lg={6}>
                    <TableContainer component={Paper}>
                        <Table className={styles.table} aria-label="volunteer table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>Volunteers</TableCell>
                                    <TableCell style={{ fontWeight: "bold" }} align="right">
                                        Present
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {eventVols.map(eVol => {
                                    return (
                                        <TableRow className={styles.tr} key={eVol.volunteer._id}>
                                            <VolAttendanceListItem event={event} eVol={eVol} />
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        table: {
            minWidth: 500,
        },
        container: {
            margin: 30,
        },
        tr: {
            cursor: "pointer",
            hover: {
                backgroundColor: colors.lightGray,
            },
        },
    });
});

export async function getServerSideProps(context: NextPageContext) {
    // get eventId from url by using context
    const eventId = context.query.eventId as string;

    // this func is run on server-side, so we can safely fetch the event directly
    const event: Event = await getEventWithVolFields(eventId);

    return {
        props: {
            event: JSON.parse(JSON.stringify(event)) as Event,
        },
    };
}

export default ManageVolunteers;
