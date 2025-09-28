import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import errorHandler from '../error.js';

const loginHandler = async (req, res) => {
    try {

        let { email, password } = req.body;
        email = email.toLowerCase();
        const user = await pool.query('select id,password from users where email=$1;', [email]);
        if (user.rows.length <= 0) {
            console.log("400");
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const hashedPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!hashedPassword) {
            console.log("401");
            return res.status(401).json({ message: 'Invalid Credentials' });
        } else {
            // Set cookie
            let token = jwt.sign({ id: user.rows[0].id }, "this is the secret key for listener app", { expiresIn: '7d' });
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ message: 'Logged in Successfully' });
        }
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}
export default loginHandler;