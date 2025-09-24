import pool from "../db.js"
import erroHandler from "../error.js"

const userHanlder = async (req, res) => {
    try {
        const id = req.userID;
        // console.log(id);
        const { rows } = await pool.query("select id, name, email from users where id = $1", [id]);
        if (rows.length > 0) {
            res.status(200).json({ message: rows });
        } else {
            res.status(400).json({ message: "Bad Request." });
        }
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default userHanlder;