import React from "react";
import { Typography } from "@material-ui/core";
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "body1" | "body2" | "overline" | "caption" | "subtitle1";

export const typographyStyles: Readonly<Record<Variant, TypographyStyleOptions>> = {
    h1: {
        fontFamily: "Ubuntu",
        fontWeight: 800,
        fontSize: "3.5rem",
        fontStyle: "normal",
        fontFeatureSettings: "'liga' off",
        lineHeight: "150%",
        letterSpacing: "normal",
    },
    h2: {
        fontFamily: "Ubuntu",
        fontWeight: 800,
        fontSize: "2.25rem",
        fontStyle: "normal",
        fontFeatureSettings: "'liga' off",
        lineHeight: "140%",
        letterSpacing: "normal",
    },
    h3: {
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        fontSize: "1.5rem",
        fontStyle: "normal",
        fontFeatureSettings: "'liga' off",
        lineHeight: "140%",
        letterSpacing: "normal",
    },
    h4: {
        fontFamily: "Ubuntu",
        fontWeight: 800,
        fontSize: "1.2rem",
        fontStyle: "normal",
        fontFeatureSettings: "'liga' off",
        lineHeight: "130%",
        letterSpacing: "normal",
    },
    h5: {
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        fontSize: "1rem",
        fontStyle: "normal",
        fontFeatureSettings: "'liga' off",
        lineHeight: "130%",
        letterSpacing: "normal",
    },
    body1: {
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "1.25rem",
        fontStyle: "normal",
        lineHeight: "150%",
        letterSpacing: "normal",
    },
    body2: {
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "1rem",
        fontStyle: "normal",
        lineHeight: "150%",
        letterSpacing: "normal",
    },
    overline: {
        fontFamily: "Roboto",
        fontWeight: 800,
        fontSize: "0.875rem",
        fontStyle: "normal",
        lineHeight: "130%",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },
    caption: {
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "0.875rem",
        fontStyle: "normal",
        lineHeight: "130%",
        letterSpacing: "normal",
    },
    subtitle1: {
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize: "0.70rem",
        fontStyle: "normal",
        lineHeight: "125%",
        letterSpacing: "normal",
    },
};

type Props = Omit<React.ComponentProps<typeof Typography>, "variant"> & {
    variant?: Variant;
};

const CoreTypography: React.FC<Props> = ({ children, variant, ...rest }) => {
    const coreVariant: Variant = variant ?? "body2";

    return (
        <Typography variant={coreVariant} {...rest}>
            {children}
        </Typography>
    );
};

export default CoreTypography;
