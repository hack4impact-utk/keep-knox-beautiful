import React, { useRef, FormEvent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DescriptionIcon from "@material-ui/icons/Description";
import Link from "@material-ui/core/Link";
import CoreTypography from "src/components/core/typography";
import colors from "src/components/core/colors";
import constants from "utils/constants";
import { Volunteer } from "utils/types";

// styles
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

            [theme.breakpoints.between(0, "sm")]: {
                flexDirection: "column",
                width: "375px",
            },
        },

        leftWrapper: {
            backgroundColor: theme.palette.primary.main,
            color: colors.white,
            paddingTop: "220px",
            height: "700px",
            [theme.breakpoints.between(0, "sm")]: {
                height: "350px",
                width: "371px",
                paddingTop: "60px",
            },
        },

        rightWrapper: {
            paddingTop: "50px",
            width: "310px",
            height: "700px",

            [theme.breakpoints.between(0, "sm")]: {
                width: "375",
                textAlign: "center",
                position: "relative",
                left: "20px",
            },
        },

        textWrapper: {
            paddingBottom: "20px",

            [theme.breakpoints.between(0, "sm")]: {
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
            marginTop: "15px",
            cursor: "pointer",
        },

        waiverCheckboxText: {
            width: "240px",
            paddingLeft: "10px",
            cursor: "pointer",
        },

        button: {
            marginTop: "25px",
            marginLeft: "160px",
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
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const phoneNumber = useRef<HTMLInputElement>(null);

    // on sign-up button click
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // creates Volunteer object
        const volunteer: Volunteer = {
            name: firstName.current!.value + " " + lastName.current!.value,
            email: email.current!.value,
            phone: phoneNumber.current?.value,
        };
        console.log(volunteer);
    };

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
                        <input
                            type="text"
                            name="firstName"
                            ref={firstName}
                            required
                            className={styles.input}
                            id="firstNameField"
                        />
                        <label htmlFor="lastNameField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="lastNameLabel">
                                Last Name
                            </CoreTypography>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            ref={lastName}
                            required
                            className={styles.input}
                            id="lastNameField"
                        />
                        <label htmlFor="emailField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="emailLabel">
                                Email
                            </CoreTypography>
                        </label>
                        <input
                            type="email"
                            name="email"
                            ref={email}
                            required
                            className={styles.input}
                            id="emailField"
                        />
                        <label htmlFor="phoneNumberField">
                            <CoreTypography variant="body1" className={styles.inputLabel} id="phoneNumberLabel">
                                Phone Number
                            </CoreTypography>
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            ref={phoneNumber}
                            className={styles.input}
                            id="phoneNumberField"
                        />
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
                                <CoreTypography variant="body2" className={styles.waiverCheckboxText}>
                                    By checking this box, I have read and acknowledged the waiver.
                                </CoreTypography>
                            </label>
                        </Container>
                        <input type="submit" value="Sign Up" className={styles.button} />
                    </form>
                </Container>
            </Container>
        </React.Fragment>
    );
}
