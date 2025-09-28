import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import errorHandler from '../error.js';

const singerRegisterHandler = async (req, res) => {
    try {

        let { email, password, name, gender, manager_email, manager_name } = req.body;
        email = email.toLowerCase();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let { rows } = await pool.query("select * from artists where email=$1", [email]);
        if (rows.length > 0) {
            return res.status(401).json({ message: 'Email is already registered.' });
        }
        const newUser = await
            pool.query('insert into artists (email,password,name,gender, manager_email, manager_name) values ($1, $2, $3, $4, $5, $6) returning id;', [email, hashedPassword, name, gender, manager_email, manager_name]);
        const token = jwt.sign({ id: newUser.rows[0].id }, "this is the secret key for listener app", { expiresIn: '30d' });

        // Set cookie
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ message: 'Registered Successfully' });

    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}
export default singerRegisterHandler;