import pool from '../db.js';
import errorHandler from '../error.js';

const userViewSingerHandler2 = async(req, res)=>{
    try {
        const aid = req.params.sid;
        const {rows} =  await pool.query("select id,name,img,duration from songs where aid = $1",[aid]);
        if(rows.length === 0){
            res.status(404).json({message: "No songs found for this singer"});
        } 
        // console.log(rows);
        res.status(200).json({message:rows});
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}
export default userViewSingerHandler2;