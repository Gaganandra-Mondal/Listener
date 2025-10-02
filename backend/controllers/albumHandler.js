import pool from '../db.js';
import errorHandler from '../error.js';

const albumHandler = async (req, res) => {
    try {
        // const {rows} = await pool.query();
    } catch (err) {
        console.log(err);
        errorHandler(res);
    }
}

export default albumHandler;