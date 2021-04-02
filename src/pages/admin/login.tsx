import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CoreTypography from "src/components/core/typography";
import colors from "src/components/core/colors";
import constants from "utils/constants";
import { Button, CircularProgress } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

function Login() {
    const styles = useStyles();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log("signed in");
        setLoading(false);
    };

    return (
        <React.Fragment>
            <Container className={styles.container}>
                <img
                    src={`/${constants.org.images.banner}`}
                    alt={`${constants.org.name.short} logo`}
                    className={styles.banner}
                />

                <CoreTypography variant="h2">Welcome Back!</CoreTypography>

                <form onSubmit={onSubmit} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="username@gmail.com"
                        className={styles.input}
                        id="emailField"
                    />
                    <PersonIcon className={styles.icon} />

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter Password"
                        className={styles.input}
                        id="passwordField"
                    />
                    <LockIcon className={styles.icon} />

                    {loading && <CircularProgress color="secondary" style={{ alignSelf: "center" }} />}

                    <Button variant="contained" type="submit" className={styles.button}>
                        <CoreTypography variant="button">LOGIN</CoreTypography>
                    </Button>
                </form>
                <Link className={styles.forgotPassword}>
                    <CoreTypography variant="caption">FORGOT PASSWORD?</CoreTypography>
                </Link>
            </Container>
        </React.Fragment>
    );
}

// styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "50px",
            marginRight: "50px",
            height: "100%",
        },

        banner: {
            width: "250px",
            paddingBottom: "50px",
            paddingTop: "45px",
        },

        form: {
            paddingTop: "20px",

            width: "350px",
            display: "inherit",
            flexDirection: "inherit",
        },

        icon: {
            position: "relative",
            bottom: "47px",
            left: "7px",
            color: colors.grays["60"],
        },

        input: {
            height: "40px",
            fontSize: "17px",
            borderStyle: "solid",
            textIndent: "35px",
            marginBottom: "15px",
            "&:focus": {
                outline: "none",
                borderColor: colors.blue,
            },
        },

        login: {
            padding: "0",
            width: "350px",
        },

        button: {
            borderRadius: "56px",
            marginTop: "15px",
            backgroundColor: theme.palette.accent.main,
            color: colors.white,
            "&:hover": {
                backgroundColor: theme.palette.accent.main,
            },
        },

        forgotPassword: {
            color: colors.grays[80],
            cursor: "pointer",
            paddingTop: "25px",
            display: "inherit",
            alignSelf: "center",
        },
    })
);

export default Login;
