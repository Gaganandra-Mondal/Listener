import pool from '../db.js';
import errorHandler from '../error.js';

const topTracksHandler = async (req, res) => {
  try {
    const {rows} = await pool.query("SELECT * from songs WHERE id IN (select sid from liked_music GROUP BY sid ORDER BY count(sid) DESC LIMIT 100);");
    if(rows.length === 0) {
      return res.status(400).json({message: "No songs found"});
    } else {
    res.status(200).json({message: rows});
    }
} catch (err) {
    console.log(err.message);
    errorHandler(err, res);
  } 
}

export default topTracksHandler;