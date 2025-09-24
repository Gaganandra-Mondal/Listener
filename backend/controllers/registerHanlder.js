import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import errorHanlder from '../error.js';

const registerHandler = async(req, res) => {
    try{
    
        const {email,password,name,age,gender} = req.body;
        email = email.toLowerCase();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await
        pool.query('insert into users (email,password,name,age,gender) values ($1, $2, $3, %4, $5) returning id;',[email,hashedPassword,name,age,gender]);
        const token = jwt.sign({id:newUser.rows[0].id},"this is the secret key for listener app",{expiresIn:'7d'});
        
        // Set cookie
        res.cookie('token',token,{httpOnly:true,sameSite:'None',maxAge:7*24*60*60*1000});
        res.status(201).json({message:'registered successfully'});
    
    } catch (err) {
        console.log(err.message);
        errorHanlder(res);
    }
}
export default registerHandler;