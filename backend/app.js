import express from "express"
import cors from "cors"
import pool from "./db.js"
import router from "./router/routes.js";
const { log: print } = console; // destructure the console object got the log function 
// store it in print variable so no print = log;
const PORT = 3333

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(router);

try {
    const connection = await pool.connect();
    connection.release();
    print("DataBase connected.");
    app.listen(PORT, () => {
        print(`Server is listenging and serving on http://localhost:${PORT}`);
    });
} catch (err) {
    print(err.message);
}
