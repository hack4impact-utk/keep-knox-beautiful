import mongoose from "mongoose";
import urls from "utils/urls";

export default async () => {
    if (mongoose.connections[0].readyState) return;
    const DB_URL: string = urls.dbUrl;

    await mongoose
        .connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((error: any) => {
            console.error("Database connection failed.");
            console.error(error instanceof Error && error);
            throw error;
        });
};
