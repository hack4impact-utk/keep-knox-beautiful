import { useMediaQuery } from "@material-ui/core";
import theme from "utils/theme";
import KKBTableDesktop from "./KKBTableDesktop";

export interface TableProps {
    children: React.ReactNode; // the child should be the table body
    name: string;
    searchable?: boolean;
    colnames: string[];
    numItems: number;
}

const KKBTable: React.FC<TableProps> = function (tProps: TableProps, context?: any) {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (isMobile) {
        return null;
    }

    return KKBTableDesktop(tProps, context);
};

export default KKBTable;
