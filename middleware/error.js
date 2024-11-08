export const ErrorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: message,
    });
};
