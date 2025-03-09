export const errorHandler = (err, req, res, next) => {
  console.log("err, req, res, next", { err, req, res, next });
  const statusCode = err.statusCode || 500; // Default to 500 if not provided
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
