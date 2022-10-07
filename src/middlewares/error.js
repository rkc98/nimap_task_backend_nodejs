exports.errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // sql duplicate entry error
  if(err.message==="ER_DUP_ENTRY"){
    err.message= "Record Already Exists";
    err.statusCode=409;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
