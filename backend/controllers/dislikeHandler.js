const dislikeHandler = async (req, res) => {
    try {
        const uid = req.userID;
        const sid = req.params.id;
        const { rows } = await pool.query("select * from liked_music where uid = $1 and aid = $2;", [uid, sid]);
        if (rows.length == 0) {
            return res.status(400).json({ message: "You doesn't like." });
        } else {
            await pool.query("delete from liked_music where uid = $1 and sid = $2;", [uid, sid]);
            return res.status(200).json({ message: "You disliked." });
        }
    } catch (err) {
        console.log(err.message);
        erroHandler(res);
    }
}

export default dislikeHandler;