import pool from '../db.js';
import errorHandler from '../error.js';

const discoverHandler = async (req, res) => {
    try {
        // Logic : We'll fetch those songs from songs table that are not streamed by the user.
        const userId = req.userID;
        const { rows } = await pool.query("select s.id as sid, s.name as sname, s.img as img, s.url as url, s.genre as genre, a.name as aname from songs s, artists a where s.aid = a.id AND s.id NOT IN (SELECT sid FROM streamed WHERE uid=$1) ORDER BY RANDOM()", [userId]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "No songs found" });
        } else {
            res.status(200).json({ message: rows });
        }
    } catch (err) {
        console.log(err);
        errorHandler(res);
    }
}

export default discoverHandler;