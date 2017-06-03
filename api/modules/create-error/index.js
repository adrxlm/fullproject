const createError = (code, publicMessage, internalError) => {
  const error = new Error(publicMessage);
  error.internalError = internalError;
  error.code = code;
  return error;
};
module.exports = createError;
