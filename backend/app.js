import express from "express"
import cors from "cors"
import pool from "./db.js"
const { log: print } = console; // destructure the console object got the log function 
// store it in print variable so no print = log;
const PORT = 3333

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello world!");
});

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
