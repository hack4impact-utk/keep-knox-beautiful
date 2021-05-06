import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { Event, Volunteer, EventVolunteer, PaginatedVolunteers, APIError } from "utils/types";
import UpsertEvent from "src/components/UpsertEvent";
import { getEvent, getEventVolunteers } from "server/actions/Event";
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
    eventId: string;
    vols?: PaginatedVolunteers;
}

function orderVolunteers(vols: Volunteer[]): Volunteer[] {
    return vols
        ? vols.sort((v1, v2) => {
              // sorry typescript, need to sort
              return Number(v1.name) - Number(v2.name);
          })
        : [];
}

const ManageVolunteers: NextPage<Props> = ({ vols, eventId }) => {
    const styles = useStyles();

    // create EventVolunteers to easily track who signed up for what.
    const eventVols = vols.volunteers;

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
                                {eventVols.map((vol, i) => {
                                    return (
                                        <TableRow className={styles.tr} key={i}>
                                            <VolAttendanceListItem
                                                eventId={eventId}
                                                eVol={{
                                                    present: i >= vols.registeredCount ? true : false,
                                                    volunteer: vol,
                                                }}
                                            />
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
    try {
        const resp = await fetch(urls.baseUrl + urls.api.eventVolunteers(eventId, 1));

        const data = await resp.json();

        if (Math.floor(resp.status / 100) !== 2 || !data.success) {
            throw new Error(data.message);
        }

        const vols = data.payload;

        return {
            props: {
                eventId: eventId,
                vols: vols,
            },
        };
    } catch (e) {
        console.log(e);
    }

    // console.log(vols);
}

export default ManageVolunteers;
