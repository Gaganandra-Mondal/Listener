const errorHandler = (res) => {
    res.status(500).json("Internal Server Error.");
}
export default errorHandler;