import React, { useState, useEffect } from "react";
import { Event, Volunteer } from "utils/types";
import CoreTypography from "src/components/core/typography/CoreTypography";
import colors from "src/components/core/colors";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { GetStaticPropsContext, NextPage } from "next";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortIcon from "@material-ui/icons/Sort";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import urls from "utils/urls";

const VolunteerEventsList = (vol: Volunteer) => {
    const classes = useStyles();
    const eventsPerPage = 3;
    const [page, setPage] = useState<number>(1);
    const [attendedEvents, setAttendedEvents] = useState<Event[]>([]);
    const volId = vol._id == undefined ? "" : vol._id;
    const totalEvents = vol.attendedEvents?.length;

    useEffect(() => {
        const getPaginatedEvents = async () => {
            try {
                const response = await fetch(`${urls.api.volunteers}/${volId}/events/?page=${page}`, { method: "GET" });
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const newAttendedEvents: Event[] = (await response.json()).payload as Event[];
                setAttendedEvents(newAttendedEvents);
            } catch (error) {
                console.log(error);
            }
        };
        void getPaginatedEvents();
    }, [volId, page]); //only rerun when page changes

    const handlePageChange = (direction: string) => {
        switch (direction) {
            case "next":
                setPage(page + 1);
                break;
            case "prev":
                if (page !== 1) {
                    setPage(page - 1);
                }
                break;
            default:
                break;
        }
    };

    const emptyRows = attendedEvents ? eventsPerPage - attendedEvents.length : eventsPerPage;

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <CoreTypography variant="h4">
                                Event Name&nbsp;&nbsp;
                                <SortIcon style={{ verticalAlign: "middle" }} />
                            </CoreTypography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <CoreTypography variant="h4">Date</CoreTypography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <CoreTypography variant="h4" style={{ textAlign: "center" }}>
                                Hours&nbsp;&nbsp;
                                <SortIcon style={{ verticalAlign: "middle" }} />
                            </CoreTypography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendedEvents.length > 0 &&
                        attendedEvents.map(row => (
                            <TableRow key={row.name} className={classes.eventRow}>
                                <TableCell component="th" scope="row">
                                    <CoreTypography variant="body2">{row.name}</CoreTypography>
                                </TableCell>
                                <TableCell align="center">
                                    <CoreTypography variant="body2">
                                        {row.startDate?.toString().split("T")[0]}
                                    </CoreTypography>
                                </TableCell>
                                <TableCell align="center">
                                    <CoreTypography variant="body2">{row.hours}</CoreTypography>
                                </TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && emptyRows != eventsPerPage && (
                        <TableRow style={{ height: 58 * emptyRows }}>
                            <TableCell colSpan={3} style={{ border: "none" }} />
                        </TableRow>
                    )}
                    {page == 1 && emptyRows == eventsPerPage && (
                        <TableRow style={{ height: 58 * emptyRows }}>
                            <TableCell
                                colSpan={3}
                                style={{
                                    border: "none",
                                }}
                            >
                                <CoreTypography variant="body1">No Attended Events</CoreTypography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className={classes.tableFooter}>
                <div />
                <div>
                    <button className={classes.iconButton} onClick={() => handlePageChange("prev")}>
                        <ChevronLeftIcon />
                    </button>
                    <button className={classes.iconButton} onClick={() => handlePageChange("next")}>
                        <ChevronRightIcon />
                    </button>
                </div>
                <div />
            </div>
        </TableContainer>
    );
};

// style attended event table header row cells
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.text.primary,
            padding: "10px",
            verticalAlign: "middle",
        },
    })
)(TableCell);

// style attended event table container and cells
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            border: `1px solid ${theme.palette.primary.light}`,
            width: "90vw",
            minWidth: "300px",
            maxWidth: "1400px",
            minHeight: "450px",
            padding: "10px 8px",
            backgroundColor: colors.white,
        },
        eventRow: {
            borderBottom: `2px solid ${theme.palette.text.secondary}`,
        },
        tableFooter: {
            marginTop: "45px",
            height: "35px",
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
        },
        iconButton: {
            background: "inherit",
            border: "none",
        },
    })
);

export default VolunteerEventsList;
