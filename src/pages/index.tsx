import React, { useState } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import withWidth from "@material-ui/core/withWidth";
import { Button, Container, createStyles, Grid, makeStyles, Theme, Divider } from "@material-ui/core";
import EventsContainer from "src/components/EventsContainer";
import CoreTypography from "src/components/core/typography";
import { getCurrentEvents, getPastEvents } from "server/actions/Event";
import constants from "utils/constants";
import { Event } from "utils/types";
import colors from "src/components/core/colors";

interface Props {
    currentEvents: Event[];
    pastEvents: Event[];
    width: string;
}

const Home: NextPage<Props> = ({ currentEvents, pastEvents, width }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    function handleLoading() {
        setLoading(true);
    }

    return (
        <div style={{ width: "100%" }} className={`${loading ? classes.loading : ""}`}>
            <div className={classes.jumbotron}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    style={{ width: "100%", paddingTop: width == "xs" ? "10%" : "" }}
                >
                    <Grid
                        item
                        xs={7}
                        sm={7}
                        lg={6}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <CoreTypography variant="h1" style={{ color: "white" }}>
                            Upcoming Events
                        </CoreTypography>
                        <CoreTypography variant="h3" style={{ fontWeight: "normal", color: "white", marginBottom: 30 }}>
                            Join us for a workday!
                        </CoreTypography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        md={3}
                        lg={3}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <img
                            src={`/${constants.org.images.logo}`}
                            alt={`${constants.org.name.short} logo`}
                            className={classes.headerImage}
                        />
                    </Grid>
                </Grid>
            </div>
            <Container disableGutters style={{ marginTop: "-20vh" }}>
                <EventsContainer
                    events={currentEvents}
                    onLoading={handleLoading}
                    loading={loading}
                    pastEvents={false}
                />
            </Container>

            <Container disableGutters maxWidth="lg">
                <Divider variant="middle" />
                <CoreTypography variant="h2" style={{ textAlign: "center", paddingTop: "30px", paddingBottom: "10px" }}>
                    Recent Events
                </CoreTypography>
            </Container>

            <Container disableGutters style={{ marginTop: "0vh", marginBottom: "100px" }}>
                <EventsContainer events={pastEvents} onLoading={handleLoading} loading={loading} pastEvents={true} />
            </Container>
        </div>
    );
};

export async function getStaticProps(context: GetStaticPropsContext) {
    try {
        const currentEvents: Event[] = await getCurrentEvents();
        const pastEvents: Event[] = await getPastEvents();

        return {
            props: {
                currentEvents: JSON.parse(JSON.stringify(currentEvents)) as Event[],
                pastEvents: JSON.parse(JSON.stringify(pastEvents)) as Event[],
            },
            revalidate: constants.revalidate.index,
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                events: [],
            },
            revalidate: constants.revalidate.index,
        };
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumbotron: {
            width: "100%",
            height: "55vh",
            backgroundColor: theme.palette.primary.main,
            position: "relative",
            top: 0,
        },
        headerImage: {
            height: "230px",
            [theme.breakpoints.down("xs")]: {
                height: "120px",
            },
        },
        "@global": {
            ".MuiDivider-middle": {
                borderTop: `2px solid ${colors.gray}`,
                margin: "100px 50px 0px 50px",
            },
        },
        loading: {
            cursor: "wait",
        },
    })
);

export default withWidth()(Home);
