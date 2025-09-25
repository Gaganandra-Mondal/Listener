const errorHanlder = (res) => {
    res.status(500).json("Internal Server Error.");
}
export default errorHanlder;