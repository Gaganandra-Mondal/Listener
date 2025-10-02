import pool from '../db.js';
import erroHandler from '../error.js';

const recomendedHandler = async (req, res) => {
    try {
        const uid = req.userID;
        if (!uid) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const { rows } = await pool.query("SELECT s.id, s.name, s.url, s.lyrics, s.duration, s.genre, s.uploaded_on FROM songs s JOIN followers f ON s.aid = f.aid WHERE f.uid = $1 AND s.id NOT IN (SELECT lm.sid FROM liked_music lm WHERE lm.uid = $1);", [uid]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "No songs found" });
            } else {
            return res.status(200).json(rows);
            }
        }
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}
export default recomendedHandler;