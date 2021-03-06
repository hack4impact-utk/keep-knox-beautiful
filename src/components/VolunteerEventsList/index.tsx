import React, { useState } from "react";
import { Event, Volunteer } from "utils/types";
import CoreTypography from "src/components/core/typography/CoreTypography";
import colors from "src/components/core/colors";
import { createStyles, makeStyles, Theme, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

// create styles for table pagination footer
const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    })
);

// create props for table pagination
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

// create table pagination actions and first, prev, next, last page buttons
function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

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

// create dummy data for design purposes -- comment out to use volId data
function createData(name: string, endDate: Date, hours: number) {
    return { name, endDate, hours };
}

const rows = [
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-16"), 4),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-12"), 3),
    createData("February Saturday Spruce Up 2", new Date("2021-02-05"), 2),
    createData("2021 North Knoxville Community Clean Up 2", new Date("2021-02-15"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
    createData("January Saturday Spruce Up", new Date("2021-01-10"), 1),
    createData("2020 North Knoxville Community Clean Up", new Date("2020-02-16"), 4),
    createData("Keep the Little River Beautiful Knoxville Clean Up", new Date("2020-04-12"), 3),
    createData("February Saturday Spruce Up 5", new Date("2021-02-05"), 2),
    createData("2021 South Knoxville Community Clean Up", new Date("2021-03-1"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
    createData("February Saturday Spruce Up", new Date("2021-02-15"), 2),
    createData("2021 North Knoxville Community Clean Up", new Date("2021-02-16"), 4),
    createData("Keep the TN River Beautiful Knoxville Clean Up", new Date("2021-02-12"), 3),
    createData("February Saturday Spruce Up 2", new Date("2021-02-05"), 2),
    createData("2021 North Knoxville Community Clean Up 2", new Date("2021-02-15"), 1),
    createData("Keep the TN River Beautiful Knoxville Clean Up 2", new Date("2021-02-22"), 2),
    createData("February Saturday Spruce Up 3", new Date("2021-02-20"), 2),
];

// create attended events table for current volunteer
export default function VolunteerEventsList(props: Volunteer) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Uncomment to use actual volunteer data for volId from server
    // const rows: Array<Event> = props.attendedEvents ? props.attendedEvents : [];

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                        row => (
                            <TableRow key={row.name} className={classes.eventRow}>
                                <TableCell component="th" scope="row">
                                    <CoreTypography variant="body2">{row.name}</CoreTypography>
                                </TableCell>
                                <TableCell align="center">
                                    <CoreTypography variant="body2">
                                        {row.endDate?.toLocaleDateString("en-us", {
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
                        )
                    )}
                </TableBody>
            </Table>
            <div className={classes.tableFooter}>
                <div />
                <div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </div>
                <div />
            </div>
        </TableContainer>
    );
}
