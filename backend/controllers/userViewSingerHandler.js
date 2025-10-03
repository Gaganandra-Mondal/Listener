import pool from "../db.js";
import errorHandler from "../error.js";

const userViewSingerHandler = async (req, res) => {
    // this sends the singer details like name,image,followers count to the user interface
    try {
        const sid = req.params.sid;
        if (!sid) {
            return res.status(400).json({ message: "Bad Request" });
        }
        const { rows } = await pool.query("select a.name as name, a.img as img, count(a.id) as followers from artists a, followers f WHERE f.aid = a.id and a.id = 4 GROUP BY(a.id) LIMIT 1;", [sid]);
        res.status(200).json({ message: rows });
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default userViewSingerHandler;