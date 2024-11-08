import dotenv from "dotenv"
import { dataBase } from "./db.js"
import  app  from "./app.js"

dotenv.config();

process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Server is closing due to uncaught exception error`);
    process.exit(1);
});

dataBase();


const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8000}`);
});

process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});
