import errorHanlder from "../error";
import pool from "../db";

const singerHandler = async(req, res) => {
    try {
        const id = req.userID;
        const response = await pool.query('select email,name,gender,manager_email,manager_name from artists where id = $1;',[id]);
        if(response.rows.length === 0){
            return res.status(401).json({ message: "artist not found" });
        } else {
            res.status(200).json({ message: "artist's data fetched successfully" });
        }
    } catch (err) {
        console.log(err.message);
        errorHanlder(res);
    }
}
export default singerHandler;