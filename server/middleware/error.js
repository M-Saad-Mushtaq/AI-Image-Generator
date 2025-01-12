const handleError = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Somethong went Wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

export default handleError;
