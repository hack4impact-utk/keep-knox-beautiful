import {
    colors,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Toolbar,
    TableBody,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TableProps } from ".";
import CoreTypography from "../core/typography";
import KKBFooterPagination from "./KKBFooterPagination";
import { KKBTableSearch } from "./KKBTableHeaderSearch";

const KKBTableDesktop: React.FC<TableProps> = function ({ children, name, searchable, colnames, numItems }) {
    const router = useRouter();
    const styles = useStyles();
    function KKBTableToolbar() {
        return (
            <Toolbar>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <CoreTypography variant="h3" style={{ margin: 20 }}>
                        {name}
                    </CoreTypography>
                    {searchable ? <KKBTableSearch /> : undefined}
                </Grid>
            </Toolbar>
        );
    }

    return (
        <InfiniteScroll dataLength={5} next={handleLoadMore} hasMore={!isLastPage} loader={<h4>Loading...</h4>}>
            <Paper className={styles.kkbTable}>
                <KKBTableToolbar />
                <TableContainer className={styles.kkbTableContainer}>
                    <Table aria-label={`${name} table`} stickyHeader>
                        <TableHead>
                            <TableRow>
                                {colnames.map(name => (
                                    <TableCell key={name}>
                                        <CoreTypography variant="h5">{name}</CoreTypography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {children /* again, should be TableBody component w map of all shown items inside */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </InfiniteScroll>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        kkbTable: {},
        kkbTableContainer: {
            maxHeight: 460,
        },

        kkbTableBody: {
            display: "block",
            height: "450px",
            overflowY: "scroll",
        },

        kkbTableBody: {
            // "& tr": {
            //     tableLayout: "fixed",
            //     display: "table",
            // },
        },
    })
);

export default KKBTableDesktop;
export { KKBTableDesktop };
