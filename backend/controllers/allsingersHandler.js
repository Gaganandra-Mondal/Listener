import errorHandler from "../error.js";
import pool from "../db.js";

const allsingersHandler = async (req, res) => {
    try {
        const response = await pool.query("select id,email,name,gender,manager_email,manager_name,img from artists limit 10;");
        if (response.rows.length === 0) {
            return res.status(401).json({ message: "Artists are not found" });
        } else {
            res.status(200).json({ message: response.rows });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default allsingersHandler;