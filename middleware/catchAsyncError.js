const catchAsyncError = asyncError => (req, res, next) => {
    Promise.resolve(asyncError(req, res, next)).catch(next);
};

export default catchAsyncError;  
