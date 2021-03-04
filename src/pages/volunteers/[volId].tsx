import React from "react";
import VolunteerEventsList from "../../components/VolunteerEventsList";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { getVolunteer } from "server/actions/Volunteer";
import { Event, Volunteer } from "utils/types";
import { GetStaticPropsContext, NextPage } from "next";
import Error from "next/error";
import constants from "utils/constants";
import CoreTypography from "src/components/core/typography/CoreTypography";
import colors from "src/components/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";

interface Props {
    vol: Volunteer;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: "50px",
        },
    })
);

const VolunteerPage: NextPage<Props> = ({ vol }) => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <div className={classes.container}>
                <VolunteerEventsList />
            </div>
            <Footer />
        </>
    );
};

// query data and pass it to component here. this is run server-side
export async function getStaticProps(context: GetStaticPropsContext) {
    try {
        console.log(context.params?.volId);
        const vol: Volunteer = await getVolunteer(context.params?.volId as string);

        return {
            props: {
                vol: JSON.parse(JSON.stringify(vol)) as Volunteer,
            },
            revalidate: constants.revalidate.volunteerProfile,
        };
    } catch (error) {
        return {
            props: {},
            revalidate: constants.revalidate.volunteerProfile,
        };
    }
}

// required for dynamic pages: prerender events at build time
export async function getStaticPaths() {
    const volunteers: Volunteer[] = []; //await getVolunteers({});

    const paths = volunteers.map(volunteer => ({
        params: { name: volunteer._id },
    }));

    return { paths, fallback: true };
}

export default VolunteerPage;
