import errorHanlder from "../error.js";
import pool from "../db.js";

const singerHandler = async (req, res) => {
    try {
        const id = req.userID;
        const response = await pool.query('select id,email,name,gender,manager_email,manager_name from artists where id = $1;', [id]);
        if (response.rows.length === 0) {
            return res.status(401).json({ message: "artist not found" });
        } else {
            res.status(200).json({ message: response.rows });
        }
    } catch (err) {
        console.log(err.message);
        errorHanlder(res);
    }
}
export default singerHandler;