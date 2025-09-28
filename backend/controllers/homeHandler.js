import pool from "../db.js"
import erroHandler from "../error.js"

const homeHandler = async (req, res) => {
    try {
        let { rows } = await pool.query("select s.id as sid, s.name as sname, s.img as img, s.url as url, s.genre as genre, a.id as aid, a.name as aname from songs s, artists a where s.aid = a.id limit 10;");
        // console.log(rows);
        res.status(200).json({ message: rows });
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default homeHandler;