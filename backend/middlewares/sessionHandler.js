import jwt from "jsonwebtoken";
let secret = "this is the secret key for listener app";
const sessionHandler = async (req, res) => {
    // console.log("This is the verifier middleware");
    try {
        let token = req.cookies.token;
        if (!token) {
            // console.log("no token");
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            // console.log(token);
            let decoded = jwt.verify(token, secret);
            req.userID = decoded.id;
            res.status(200).json({ message: "Authorized" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
export default sessionHandler;