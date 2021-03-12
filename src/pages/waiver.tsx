import React from "react";
import InputMask from "react-input-mask";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DescriptionIcon from "@material-ui/icons/Description";
import Link from "@material-ui/core/Link";
import CoreTypography from "src/components/core/typography";
import colors from "src/components/core/colors";
import constants from "utils/constants";

export default function Waiver() {
    const styles = useStyles();

    return (
        <React.Fragment>
            <Container>
                <CoreTypography variant="h1">KKB Volunteer Waiver</CoreTypography>
                <CoreTypography variant="h2">Release and Waiver of Liability</CoreTypography>
                <CoreTypography variant="body1">this is a whole lot of text I mean a WHOLE lot of text!</CoreTypography>
            </Container>
        </React.Fragment>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "80vw",
        },
    })
);
