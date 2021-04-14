import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import constants from "utils/constants";
import AdminContent from "./admin_content";
import { Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.primary.main,
            height: "100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            top: 0,
        },
        headerBanner: {
            height: "60px",
        },
        adminContent: {
            position: "absolute",
            right: "20px",
        },
    })
);

// update to use material-ui header?
const Header: React.FC = () => {
    const styles = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="xl" className={styles.container}>
                <img
                    src={`/${constants.org.images.banner}`}
                    className={styles.headerBanner}
                    alt={`${constants.org.name.short} banner`}
                ></img>
                {
                    // TODO: change to check for login
                    true && (
                        <Toolbar className={styles.adminContent}>
                            <AdminContent />
                        </Toolbar>
                    )
                }
            </Container>
        </React.Fragment>
    );
};

export default Header;
