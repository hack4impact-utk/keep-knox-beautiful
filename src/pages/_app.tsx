import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "utils/theme";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Keep Knoxville Beautiful</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Header />
                    <div className="container">
                        <Component {...pageProps} />
                        <style jsx>{`
                            .container {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                            }
                        `}</style>

                        <style jsx global>{`
                            html,
                            body {
                                padding: 0;
                                margin: 0;
                                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                                    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                            }
                            * {
                                box-sizing: border-box;
                            }
                        `}</style>
                        <Footer />
                    </div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
