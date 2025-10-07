import pool from "../db.js";
import errorHandler from "../error.js";

const searchHandler = async (req, res) => {
    try {
        let search = req.body.searchData;
        if (!search) {
            return res.status(400).json({ message: "Bad Request" });
        }
        // console.log(search);
        let { rows } = await pool.query("select * from songs where name ilike $1", [`%${search}%`]);
        if (rows.length > 0) {
            // console.log(rows);
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