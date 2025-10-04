import errorHandler from "../error.js";
import pool from "../db.js";

const songHandler = async (req, res) => {
    try {
        let id = req.params.sid;
        if (!id) {
            return res.status(400).json({ message: "Bad Request" });
        }
        let { rows } = await pool.query("SELECT s.name as name, s.img as img, s.url as url, s.genre as genre, s.duration as duration, a.name as aname from songs s, artists a where s.aid = a.id and s.id = $1;", [id]);
        if (rows.length > 0) {
            res.status(200).json({ message: rows[0] });
        } else {
            res.status(400).json({ message: "Bad Request" });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default songHandler;