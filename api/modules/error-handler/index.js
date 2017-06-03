const errorHandler = (err, req, res, next) => {
  console.error(err.internalError);
  res.status(err.code || 500).json({ error: err.message });
};
module.exports = errorHandler;
