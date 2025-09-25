import pool from '../db.js';
import errorHanlder from '../error.js';

const deleteHandler = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err.message);
        errorHanlder(res);
    }
}

export default deleteHandler;