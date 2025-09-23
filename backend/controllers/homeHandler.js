import pool from "../db.js"
import erroHandler from "../error.js"

const homeHandler = async (req, res) => {
    try {
        let { rows } = await pool.query("select * from songs limit 10;");
        // console.log(rows);
        res.status(200).json({ message: rows });
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default homeHandler;