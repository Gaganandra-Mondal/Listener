import pool from '../db.js';
import errorHandler from '../error.js';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
let SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsa3B5YmJnc2pwa2d3dXJyeGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODc2MTEsImV4cCI6MjA2MTg2MzYxMX0.FMg9uwyAs18IyHVaU-eLzrWX4CNbZRWWcVahWJLNFfQ";
let SUPABASE_URL = "https://klkpybbgsjpkgwurrxkw.storage.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

let storage = multer.memoryStorage();

export let upload = multer({ storage, limits: { fileSize: 16 * 1024 * 1024 } }); // 16mb limit

const uploadHandler = async (req, res) => {
    // let imgNameSTR, audioNameSTR = "";
    try {
        let { name, duration, genre } = req.body;
        let { files } = req;
        let singerID = req.userID;
        if (!name || !duration || !genre || !files || !singerID) {
            return res.status(400).json({ message: "Need all the required fields." });
        } else {
            // console.log(files.img[0].buffer.toString("hex").slice(0, 11));
            // console.log(files.img[0].mimetype);
            // console.log(files.url[0].buffer.toString("hex").slice(0, 11));
            // console.log(files.url[0].mimetype);
            // console.log(files);
            const { img, url } = files;
            // console.log(url);
            imgNameSTR = img[0].originalname;
            audioNameSTR = url[0].originalname;
            const imgUpload = await supabase.storage
                .from('images')
                .upload(`${img[0].originalname}`, img[0].buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: img[0].mimetype
                });
            if (imgUpload.error) throw Error(imgUpload.error.message);
            const urlUpload = await supabase.storage
                .from('songs')
                .upload(`${url[0].originalname}`, url[0].buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: url[0].mimetype
                });
            if (urlUpload.error) throw Error(urlUpload.error.message);
            let imageURL = supabase.storage
                .from('images')
                .getPublicUrl(img[0].originalname);
            let audioURL = supabase.storage
                .from('songs')
                .getPublicUrl(url[0].originalname);
            if (!imageURL || !audioURL) {
                throw new Error("Upload on supabase is failed!");
            }
            let { rows } = await pool.query("insert into songs(name, img, aid, url, lyrics, duration, genre, uploaded_on) values($1, $2, $3, $4, $5, $6, $7, $8) returning id;", [name, imageURL.data.publicUrl, singerID, audioURL.data.publicUrl, "None", duration, genre, new Date()]);
            return res.status(200).json({ message: "Song is uploaded successfully.", sid: rows[0].id });
        }
    }
    catch (err) {
        console.log(err.message);
        errorHandler(res);
        // try {
        //     // let imgRemovePromise = supabase.storage.from("images").remove([imgNameSTR]);
        //     // let audioRemovePromise = supabase.storage.from("songs").remove([audioNameSTR]);
        //     // let [response1, response2] = await Promise.all([imgRemovePromise, audioRemovePromise]);
        //     // if (response1.error) throw new Error(response1.error.message);
        //     // if (response2.error) throw new Error(response2.error.message);
        //     let imgRemove = await supabase.storage.from("images").remove([imgNameSTR]);
        //     let audioRemove = await supabase.storage.from("songs").remove([audioNameSTR]);
        //     if (imgRemove.error) throw new Error(response1.error.message);
        //     if (audioRemove.error) throw new Error(response2.error.message);
        // } catch (err) {
        //     console.log(err.message);
        // }
    }
}

export default uploadHandler;