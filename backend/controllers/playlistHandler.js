import pool from "../db.js";
import errorHandler from "../error.js";

const getPlaylists = async (req, res) => {
  try {
    const { id } = req.userID;
    const response = await pool.query(
      "select * from playlists where uid =$1;",
      [id]
    );
    if (response.rows.length <= 0) {
      return res.status(404).json({ message: "No Playlists Found" });
    }
    res.status(200).json({ message: response.rows });
  } catch (err) {
    console.log(err.message);
    errorHandler(res);
  }
};
export default getPlaylists;
