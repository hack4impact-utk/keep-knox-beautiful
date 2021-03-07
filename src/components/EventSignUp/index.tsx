import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CoreTypography from "src/components/core/typography";
import colors from "src/components/core/colors";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import constants from "utils/constants";
import DescriptionIcon from "@material-ui/icons/Description";
import { Volunteer } from "utils/types";

const resizeThreshold = 720;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            textAlign: "center",
            width: "750px",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: theme.palette.primary.main,
            height: "auto",
            paddingLeft: "0",

            [theme.breakpoints.between(0, resizeThreshold)]: {
                flexDirection: "column",
                width: "375px",
            },
        },

        leftWrapper: {
            backgroundColor: theme.palette.primary.main,
            color: colors.white,
            paddingTop: "220px",
            height: "700px",
            [theme.breakpoints.between(0, resizeThreshold)]: {
                width: "371px",
            },
        },

        rightWrapper: {
            paddingTop: "50px",
            width: "310px",
            height: "700px",

            [theme.breakpoints.between(0, resizeThreshold)]: {
                width: "375",
                textAlign: "center",
                position: "relative",
                left: "20px",
            },
        },

        textWrapper: {
            paddingBottom: "20px",

            [theme.breakpoints.between(0, resizeThreshold)]: {
                paddingBottom: "35px",
            },
        },

        form: {
            textAlign: "left",
        },

        input: {
            backgroundColor: colors.lightGray,
            border: "none",
            height: "40px",
            fontSize: "20px",
        },

        inputLabel: {
            paddingTop: "25px",
            paddingBottom: "5px",
        },

        waiverLinkWrapper: {
            paddingLeft: "0px",
            paddingTop: "5px",
        },

        waiverWrapper: {
            paddingLeft: "0px",
        },

        waiverLink: {
            color: colors.grays[80],
            cursor: "pointer",
        },

        waiverCheckboxWrapper: {
            display: "flex",
            paddingTop: "10px",
            paddingLeft: "0px",
        },

        waiverCheckbox: {
            cursor: "pointer",
            backgroundColor: "red",
        },

        checkboxText: {
            width: "240px",
            paddingLeft: "10px",
            cursor: "pointer",
        },

        button: {
            marginTop: "25px",
            marginLeft: "140px",
            padding: "15px",
            backgroundColor: theme.palette.primary.main,
            border: "none",
            color: colors.white,
            borderRadius: "6px",
            fontSize: "20px",
            fontFamily: "Roboto",
        },
    })
);
