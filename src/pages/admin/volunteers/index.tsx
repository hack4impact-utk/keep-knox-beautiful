import {
    createStyles,
    makeStyles,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    TableBody,
    Container,
    Grid,
    TextField,
    InputAdornment,
} from "@material-ui/core";
import { Menu, More, Search } from "@material-ui/icons";
import { GetStaticPropsContext, NextPage, NextPageContext } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getVolunteers } from "server/actions/Volunteer";
import colors from "src/components/core/colors";
import constants from "utils/constants";
import { Volunteer, LoadMorePaginatedData, ApiResponse } from "utils/types";
import urls from "utils/urls";
import InfiniteScroll from "react-infinite-scroll-component";
import KKBTable from "src/components/KKBTable";
import { useRouter } from "next/router";

interface Props {
    pageVols: LoadMorePaginatedData;
}

const VolunteersPage: NextPage<Props> = ({ pageVols }) => {
    const styles = useStyles();
    const [search, setSearch] = useState("");
    const [vols, setVols] = useState<Volunteer[]>(pageVols.data);
    const [page, setPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(pageVols.isLastPage);
    const [totalItems, setTotalItems] = useState(pageVols.totalItems ?? 1);

    // update state on props change
    useEffect(() => {
        setVols(pageVols.data);
        setTotalItems(pageVols.totalItems);
        setIsLastPage(pageVols.isLastPage);
    }, [pageVols]);

    // helper func to get the vols by search query
    async function getVolsFromSearch(query: string) {
        const r = await fetch(`${urls.api.volunteers}?page=1&search=${query}`, {
            method: "GET",
        });
        const response = (await r.json()) as ApiResponse;
        const newVolsData = response.payload as LoadMorePaginatedData;

        setVols(newVolsData.data);
        setIsLastPage(newVolsData.isLastPage);
    }

    // helper func to get the vols for a certain page
    async function getVolsForPage(newPage: number) {
        const r = await fetch(`${urls.api.volunteers}?page=${newPage}&search=${search}`, {
            method: "GET",
        });
        const response = (await r.json()) as ApiResponse;
        const newVolsData = response.payload as LoadMorePaginatedData;

        setVols(vols.concat(newVolsData.data));
        setIsLastPage(newVolsData.isLastPage);
    }

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
        await getVolsFromSearch(event.target.value);
    };
    const handleLoadMore = async () => {
        await getVolsForPage(page + 1);
        setPage(page + 1);
    };

    return (
        <Container maxWidth="xl" className={styles.container}>
            <Grid container direction="row" spacing={6} justify="center">
                <Grid item xs={12} md={10} lg={8}>
                    {/* <InfiniteScroll
                        dataLength={vols.length}
                        next={handleLoadMore}
                        hasMore={!isLastPage}
                        loader={<h4>Loading...</h4>}
                    >
                        <TableContainer component={Paper}>
                            <Table className={styles.table} aria-label="volunteer table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>Volunteer Name</TableCell>
                                        <TableCell style={{ fontWeight: "bold" }} align="right">
                                            Email
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vols.map(vol => (
                                        <Link href={urls.pages.volunteer(vol._id!)} passHref key={vol._id}>
                                            <TableRow className={styles.tr} hover>
                                                <TableCell>{vol.name}</TableCell>
                                                <TableCell align="right">{vol.email}</TableCell>
                                            </TableRow>
                                        </Link>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </InfiniteScroll> */}
                    <KKBTable name="Volunteers" colnames={["Name", "Email", ""]} numItems={totalItems} searchable>
                        {vols.map(vol => (
                            <Link href={urls.pages.volunteer(vol._id!)} passHref key={vol._id}>
                                <TableRow className={styles.tr} hover>
                                    <TableCell>{vol.name}</TableCell>
                                    <TableCell>{vol.email}</TableCell>
                                    <TableCell>
                                        <Menu />
                                    </TableCell>
                                </TableRow>
                            </Link>
                        ))}
                    </KKBTable>
                </Grid>
            </Grid>
        </Container>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    try {
        // validate admin user
        const cookie = context.req?.headers.cookie;
        const response = await fetch(`${urls.baseUrl}${urls.api.validateLogin}`, {
            method: "POST",
            headers: {
                cookie: cookie || "",
            },
        });

        // redirect
        if (response.status !== 200) {
            context.res?.writeHead(302, {
                Location: urls.pages.login,
            });
            context.res?.end();
        }

        const volsData: LoadMorePaginatedData = await getVolunteers(context.query.p ?? 1, context.query.q);
        if (!volsData) {
            throw new Error("Error fetching volunteer data.");
        }

        return {
            props: {
                pageVols: JSON.parse(JSON.stringify(volsData)),
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        table: {
            minWidth: 500,
        },
        container: {
            marginTop: 30,
            marginBottom: 70,
        },
        tr: {
            cursor: "pointer",
            hover: {
                backgroundColor: colors.lightGray,
            },
        },
    });
});

export default VolunteersPage;
