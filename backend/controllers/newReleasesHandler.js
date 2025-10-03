import pool from '../db.js';
import errorHandler from '../error.js';

const newReleasesHandler = async (req, res) => {
    try {
        const { rows } = await pool.query("select s.id as sid, s.name as sname, s.img as img, s.url as url, s.genre as genre, a.name as aname from songs s, artists a where s.aid = a.id AND s.uploaded_on >= CURRENT_DATE - INTERVAL '30 days'");
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