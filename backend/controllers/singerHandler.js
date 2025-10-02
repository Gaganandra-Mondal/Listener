import jwt from "jsonwebtoken";
let secret = "this is the secret key for listener app";
const sessionCheckSinger = async (req, res, next) => {
    // console.log("This is the verifier middleware");
    try {
        let token = req.cookies.token;
        if (!token) {
            // console.log("no token");
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            // console.log(token);
            token = jwt.verify(token, secret);
            req.userID = token.id;
            next();
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
export default sessionCheckSinger;