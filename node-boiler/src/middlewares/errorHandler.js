export const errorHandler = (err, req, res, next) => {
    //console.error(err.status);
    res.status(err.status || 500).json({
      success: false,
      statusCode: err.status,
      message: err.message || 'Internal Server Error',
    });
  };
  