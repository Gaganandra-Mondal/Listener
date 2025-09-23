import errorHandler from "../error.js";

const logoutHandler = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "You are successfully logged out." });
    } catch (err) {
        console.log(err.message);
        errorHandler(res);
    }
}

export default logoutHandler;