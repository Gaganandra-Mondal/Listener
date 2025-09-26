import pool from "../db.js";
import erroHandler from "../error.js";

const likeHandler = async (req, res) => {
    try {
        const uid = req.userID;
        const sid = req.params.id;
        const { rows } = await pool.query("select * from liked_music where uid = $1 and sid = $2;", [uid, sid]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "You have already liked." });
        } else {
            await pool.query("insert into liked_music(uid, sid) values($1, $2);", [uid, sid]);
            return res.status(200).json({ message: "You liked it." });
        }
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default likeHandler;