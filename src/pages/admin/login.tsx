import React, { useState, useRef } from "react";
import InputMask from "react-input-mask";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DescriptionIcon from "@material-ui/icons/Description";
import Link from "@material-ui/core/Link";
import CoreTypography from "src/components/core/typography";
import colors from "src/components/core/colors";
import constants from "utils/constants";
import { Volunteer } from "utils/types";
import { Button } from "@material-ui/core";

function Login() {
    const styles = useStyles();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("signed in");
    };

    return (
        <React.Fragment>
            <Container className={styles.container}>
                <CoreTypography variant="h2" className={styles.textWrapper}>
                    Welcome Back!
                </CoreTypography>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="email" name="email" required className={styles.input} id="emailField" />

                    <input type="password" name="password" required className={styles.input} id="passwordField" />

                    <Container className={styles.login}>
                        <Button variant="contained" type="submit" className={styles.button}>
                            <CoreTypography variant="button">LOGIN</CoreTypography>
                        </Button>

                        <Link>
                            <CoreTypography variant="caption" className={styles.forgotPassword}>
                                FORGOT PASSWORD?
                            </CoreTypography>
                        </Link>
                    </Container>
                </form>
            </Container>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",

            //marginLeft: "200px",
            //marginRight: "200px",
        },

        textWrapper: {},

        form: {
            paddingTop: "40px",
            width: "350px",
            display: "inherit",
            flexDirection: "column",
        },

        input: {
            height: "40px",
            fontSize: "20px",
            marginBottom: "40px",
        },

        login: {
            padding: "0",
            width: "350px",

            display: "inherit",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },

        button: {
            borderRadius: "56px",
            //width: "100%",
            width: "130px",
            backgroundColor: "#F58647",
            color: colors.white,
        },

        forgotPassword: {
            color: colors.grays[80],
            cursor: "pointer",

            //paddingTop: "25px",
            paddingLeft: "35px",
        },
    })
);

export default Login;
