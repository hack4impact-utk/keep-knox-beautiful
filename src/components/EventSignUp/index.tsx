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

export default function EventSignUp() {
    const styles = useStyles();

    return (
        <React.Fragment>
            <Container className={styles.container}>
                <Container className={styles.leftWrapper}>
                    <CoreTypography variant="h1" className={styles.textWrapper}>
                        Sign Up
                    </CoreTypography>
                    <CoreTypography variant="h2" className={styles.textWrapper}>
                        We&#39;d love for you <br></br>to join us!
                    </CoreTypography>
                </Container>
                <Container className={styles.rightWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label htmlFor="firstNameField">
                            <CoreTypography variant="body1" className={styles.inputLabel}>
                                First Name
                            </CoreTypography>
                        </label>
                        <input type="text" name="firstName" required className={styles.input} id="firstNameField" />
                        <label htmlFor="lastNameField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="lastNameLabel">
                                Last Name
                            </CoreTypography>
                        </label>
                        <input type="text" name="lastName" required className={styles.input} id="lastNameField" />
                        <label htmlFor="emailField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="emailLabel">
                                Email
                            </CoreTypography>
                        </label>
                        <input type="text" name="email" required className={styles.input} id="emailField" />
                        <label htmlFor="phoneNumberField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="phoneNumberLabel">
                                Phone Number
                            </CoreTypography>
                        </label>
                        <input type="text" name="phoneNumber" className={styles.input} id="phoneNumberField" />
                        <Container className={styles.waiverLinkWrapper}>
                            <br></br>
                            <DescriptionIcon htmlColor="gray" />
                            &nbsp;
                            <Link className={styles.waiverLink}>{constants.org.name.short} Volunteer Waiver</Link>
                        </Container>
                        <Container className={styles.waiverCheckboxWrapper}>
                            <input
                                type="checkbox"
                                name="waiverCheckbox"
                                required
                                className={styles.waiverCheckbox}
                                id="waiverCheckbox"
                            />
                            <label htmlFor="waiverCheckbox">
                                <CoreTypography variant="body2" className={styles.checkboxText}>
                                    By checking this box, I have read and acknowledged the waiver.
                                </CoreTypography>
                            </label>
                        </Container>
                        <Container>
                            <input type="submit" value="Sign Up" className={styles.button} />
                        </Container>
                    </form>
                </Container>
            </Container>
        </React.Fragment>
    );

    function handleSubmit() {
        event?.preventDefault();

        const firstName = (document.getElementById("firstNameField") as HTMLInputElement).value;
        const lastName = (document.getElementById("lastNameField") as HTMLInputElement).value;
        const email = (document.getElementById("emailField") as HTMLInputElement).value;
        const phoneNumber = (document.getElementById("phoneNumberField") as HTMLInputElement).value;

        const volunteer: Volunteer = { name: firstName + " " + lastName, email: email, phone: phoneNumber };
        console.log(JSON.stringify(volunteer));
    }
}
