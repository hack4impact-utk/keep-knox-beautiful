import React from "react";
import constants from "utils/constants";
import CoreTypography from "src/components/core/typography/CoreTypography";
import colors from "src/components/core/colors";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortIcon from "@material-ui/icons/Sort";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            border: `1px solid ${theme.palette.primary.light}`,
            minWidth: "300px",
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
        pageArrow: {
            background: "none",
            border: "none",
        },
    })
);

function createData(eventName: string, date: Date, hours: number) {
    return { eventName, date, hours };
}

const rows = [
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-15"), 4),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-15"), 3),
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-15"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-15"), 2),
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
];

export default function VolunteerEventsList() {
    const classes = useStyles();

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
                    {rows.map(row => (
                        <TableRow key={row.eventName} className={classes.eventRow}>
                            <TableCell component="th" scope="row">
                                <CoreTypography variant="body2">{row.eventName}</CoreTypography>
                            </TableCell>
                            <TableCell align="center">
                                <CoreTypography variant="body2">
                                    {row.date.toLocaleDateString("en-us", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })}
                                </CoreTypography>
                            </TableCell>
                            <TableCell align="center">
                                <CoreTypography variant="body2">{row.hours}</CoreTypography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.tableFooter}>
                <div />
                <div>
                    <CoreTypography variant="subtitle1">12</CoreTypography>
                </div>
                <div>
                    <button className={classes.pageArrow}>
                        <ArrowRightAltIcon />
                    </button>
                </div>
            </div>
        </TableContainer>
    );
}
