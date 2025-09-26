import pool from "../db.js";
import erroHandler from "../error.js";

const followHandler = async (req, res) => {
    try {
        const uid = req.userID;
        const aid = req.params.id;
        const { rows } = await pool.query("select * from followers where uid = $1 and aid = $2;", [uid, aid]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "Already follows." });
        } else {
            await pool.query("insert into followers(uid, aid) values($1, $2);", [uid, aid]);
            return res.status(200).json({ message: "You have Started following." });
        }
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default followHandler;