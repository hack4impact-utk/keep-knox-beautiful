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
    Button,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import colors from "src/components/core/colors";
import urls from "utils/urls";
import { addVolunteer, markVolunteerNotPresent, markVolunteerPresent } from "server/actions/Volunteer";
import VolAttendanceListItem from "src/components/VolAttendanceListItem";
import CoreTypography from "src/components/core/typography";
import VolQuickAddDialog from "src/components/VolQuickAddDialog";

interface Props {
    event: Event;
    vols: PaginatedVolunteers;
}

function orderVolunteers(vols: Volunteer[]): Volunteer[] {
    return vols
        ? vols.sort((v1, v2) => {
              // sorry typescript, need to sort
              return Number(v1.name) - Number(v2.name);
          })
        : [];
}

const ManageVolunteers: NextPage<Props> = ({ vols, event }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);

    // create EventVolunteers to easily track who signed up for what.
    const eventVols = vols.volunteers;

    const createAndRegisterVol = async function (vol: Volunteer) {
        try {
            const response = await fetch(`${urls.baseUrl}${urls.api.eventQuickadd(event._id!)}`, {
                method: "POST",
                body: JSON.stringify({
                    ...vol,
                }),
            });
            const responseJSON = (await response.json()) as { success: boolean; payload: unknown };

            if (responseJSON.success) {
                setOpen(false);
            } else {
                alert("ERROR creating vol");
            }
            setOpen(false);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            alert(`ERROR: ${e}`);
            console.error(e);
        }
    };

    return (
        <Container maxWidth={false} className={styles.container}>
            <div className={styles.jumbotron}>
                <Grid container spacing={0} direction="row" justify="center" style={{ width: "100%" }}>
                    <Grid item xs={12} sm={7} lg={6} className={styles.pageTitle}>
                        <CoreTypography variant="h1" style={{ color: "white", textAlign: "center" }}>
                            {event.name}
                        </CoreTypography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0} direction="row" justify="flex-end" style={{ width: "100%" }}>
                            <Grid item xs={12} md={4}>
                                <Button
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    variant="contained"
                                    style={{ backgroundColor: colors.orange, color: "white" }}
                                >
                                    Add +
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Grid container direction="row" spacing={6} justify="center">
                <Grid item xs={10} md={8}>
                    <Grid container direction="row" justify="flex-end">
                        <TextField
                            variant="outlined"
                            label="Search"
                            margin="dense"
                            size="small"
                            style={{ margin: 30 }}
                            color="secondary"
                            onChange={() => {
                                return;
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
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
                                                eventId={event._id!}
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
            <VolQuickAddDialog
                open={open}
                closeDialog={() => {
                    setOpen(false);
                }}
                createAndRegisterVol={createAndRegisterVol}
            />
        </Container>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        table: {
            minWidth: 500,
            marginBottom: 50,
        },
        container: {
            width: "100%",
            padding: 0,
        },
        tr: {
            cursor: "pointer",
            hover: {
                backgroundColor: colors.lightGray,
            },
        },
        jumbotron: {
            width: "100%",
            height: "25vh",
            backgroundColor: theme.palette.primary.main,
            marginBottom: 50,
        },
        pageTitle: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "20px",
            [theme.breakpoints.down("xs")]: {
                alignItems: "center",
            },
        },
    });
});

export async function getServerSideProps(context: NextPageContext) {
    // get eventId from url by using context
    const eventId = context.query.eventId as string;
    const event = await getEvent(eventId);

    // this func is run on server-side, so we can safely fetch the event directly
    try {
        const volsObj = await getEventVolunteers(eventId, 1);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const paginatedVols: PaginatedVolunteers = JSON.parse(JSON.stringify(volsObj));

        return {
            props: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                event: JSON.parse(JSON.stringify(event)),
                vols: paginatedVols,
            },
        };
    } catch (e) {
        return {
            props: {
                event: event,
                vols: [],
            },
        };
    }
}

export default ManageVolunteers;
