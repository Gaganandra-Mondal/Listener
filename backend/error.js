const errorHanlder = (res) => {
    res.status(500).json("Internal server error.");
}
export default errorHanlder;