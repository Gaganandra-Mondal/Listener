import pool from "../db.js";
import errorHandler from "../error.js";

const searchHandler = async (req, res) => {
    try {
        let search = req.body.search;
        if (!search) {
            return res.status(400).json({ message: "Bad Request" });
        }
        let { rows } = await pool.query("select * from songs where ilike $1", [`%${search}%`]);
        if (rows.length > 0) {
            return res.status(200).json({ message: rows });
        } else {
            return res.status(400).json({ message: "Sorry Nothing is Found" });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}
export default searchHandler;