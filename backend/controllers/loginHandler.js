import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import errorHanlder from '../error.js';

const loginHandler = async (req, res) => {
    try {

        const { email, password } = req.body;
        email = email.toLowerCase();
        const user = await pool.query('select id,passowrd from users where email=$1;', [email]);
        const hashedPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!hashedPassword) {
            return res.status(401).json({ message: 'invalid credentials' });
        } else {
            // Set cookie
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            jwt.sign({ id:user.rows[0].id }, "this is the secret key for listener app", { expiresIn: '7d' });
            res.status(200).json({ message: 'logged in successfully' });
        }
    } catch (err) {
        console.log(err.message);
        errorHanlder(res);
    }
}
export default loginHandler;