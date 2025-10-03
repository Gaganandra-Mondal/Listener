import pool from "../db.js";
import errorHandler from "../error.js";

const userViewSingerHandler = async (req, res) => {
    // this sends the singer details like name,image,followers count to the user interface
    try {
        const sid = req.params.sid;
        console.log(sid);
        if (!sid) {
            return res.status(400).json({ message: "Bad Request" });
        }
        const { rows } = await pool.query("select a.name as name, a.img as img, count(a.id) as followers from artists a, followers f WHERE f.aid = a.id and a.id = $1 GROUP BY(a.id) LIMIT 1;", [sid]);
        if (rows.length > 0) {
            res.status(200).json({ message: rows[0] });
        } else {
            let { rows } = await pool.query("select name, img from artists where id = $1", [sid]);
            res.status(200).json({ message: rows[0] });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default userViewSingerHandler;