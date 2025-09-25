import errorHandler from "../error.js";

const singerLogoutHandler = (req, res) => {
    try {
        console.log("Logout Handler.");
        res.clearCookie("token");
        res.status(200).json({ message: "You are successfully logged out." });
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default singerLogoutHandler;