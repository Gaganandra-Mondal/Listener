import pool from "../db.js";
import errorHandler from "../error.js";

const singerSongsHandler = async (req, res) => {
    try {
        const sid = req.userID;
        let { rows } = await pool.query("SELECT s.id, s.name, s.aid, a.name, s.img, s.url, s.duration, s.uploaded_on from songs s, artists a where s.aid = a.id and a.id = $1 LIMIT 100;", [sid]);
        res.status(200).json({ message: rows });
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default singerSongsHandler;