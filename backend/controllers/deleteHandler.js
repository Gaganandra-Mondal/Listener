import pool from '../db.js';
import errorHandler from '../error.js';

const deleteHandler = async (req, res) => {
    try {
        const aid = req.userID;
        const sid = req.params.sid;
        await pool.query("delete from songs where id = $1 and aid = $2", [sid, aid]);

        res.status(200).json({ message: "Song deleted successfully." });
    }
    catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default deleteHandler;