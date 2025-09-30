import pool from "../db.js";
import errorHandler from "../error.js";

const userViewSingerHandler = async (req, res) => {
    try {
        const sid = req.params.sid;
        if (!sid) {
            return res.status(400).json({ message: "Bad Request" });
        }
        const { rows } = await pool.query("SELECT s.id, s.name, a.name, s.img, s.url, s.duration from songs s, artists a where s.aid = a.id and a.id = $1 LIMIT 100;", [sid]);
        res.status(200).json({ message: rows });
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default userViewSingerHandler;