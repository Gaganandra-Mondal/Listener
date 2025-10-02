import pool from '../db.js';
import errorHandler from '../error.js';

const newReleasesHandler = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM songs WHERE uploaded_on >= CURRENT_DATE - INTERVAL '30 days'");
        if (rows.length === 0) {
            return res.status(400).json({ message: "No new releases found" });
        } else {
            res.status(200).json({ message: rows });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default newReleasesHandler;