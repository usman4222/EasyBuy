const dotenv = require('dotenv');
const app = require('./app');
const dataBase = require('./db');

dotenv.config();  

process.on("uncaughtException", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Server is closing due to uncaught exception error`);
    process.exit(1);  
});

dataBase();

console.log("Loaded PORT:", process.env.PORT);


const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (error) => {
    console.log(`Error: ${error.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);  
    });
});
