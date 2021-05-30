import { TextField, InputAdornment, debounce, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useRouter } from "next/router";

// This component will modify the routes 's' query param, which will be looked for by table data
// when searching
export function KKBTableSearch() {
    const router = useRouter();
    const styles = useStyles();
    const handleSearchChange = async function (event: React.ChangeEvent<HTMLInputElement>) {
        await debounce(async () => {
            if (event.target.value) {
                await router.push({
                    pathname: router.pathname,
                    query: { ...router.query, q: event.target.value, p: router.query.p !== undefined ? 1 : undefined },
                });
            } else {
                delete router.query.q;
                await router.push({
                    pathname: router.pathname,
                    query: router.query,
                });
            }
        }, 700)();
    };
    return (
        <TextField
            className={styles.searchField}
            variant="outlined"
            placeholder="Search..."
            margin="dense"
            color="secondary"
            onChange={handleSearchChange}
            defaultValue={router.query.q}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchField: {
            height: 30,
            marginTop: 0,
            "& .MuiOutlinedInput-inputMarginDense": {
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: 18,
            },
        },
    })
);
