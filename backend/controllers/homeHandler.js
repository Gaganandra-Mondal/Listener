import pool from "../db.js"
import erroHandler from "../error.js"

const homeHandler = async (req, res) => {
    try {
        let { row } = await pool.query("select * from songs limit 10;")
        res.status(200).json({ message: row });
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default homeHandler;