import pool from '../db.js';
import errorHandler from "../error.js";

const checkFollowHandler = async (req, res) => {
    try {
        const uid = req.userID;
        const aid = req.params.sid;
        const query = 'SELECT * FROM followers WHERE uid = $1 AND aid = $2';
        let { rows } = await pool.query(query, [uid, aid]);
        if (rows.length === 0) {
            return res.status(200).json({ isFollowing: false });
        }
        return res.status(200).json({ isFollowing: true });
    } catch (err) {
        console.error(err.message1);
        errorHandler(res);
    }
}
export default checkFollowHandler;