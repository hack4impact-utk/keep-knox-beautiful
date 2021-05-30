/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TablePagination } from "@material-ui/core";
import { NextRouter, useRouter } from "next/router";
import React from "react";

interface Props {
    numItems: number;
}

const KKBFooterPagination: React.FC<Props> = function ({ numItems }) {
    const router = useRouter();
    const page = {
        get: function () {
            return parseInt((router.query.p as string) ?? "1");
        },
        set: async function (newVal: number) {
            await router.replace({ pathname: router.pathname, query: { ...router.query, p: newVal } });
        },
    };
    return (
        <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={numItems}
            rowsPerPage={5}
            page={page.get() - 1}
            onChangePage={async (ev: unknown, newPage: number) => {
                await page.set(newPage + 1);
            }}
        ></TablePagination>
    );
};

export default KKBFooterPagination;
