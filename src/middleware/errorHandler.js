//Centralized error handling middleware

const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: 500,
        message: "Internal server error",
        error: err.message
    });
};

export default errorHandling;