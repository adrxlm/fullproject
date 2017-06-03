const logBody = (req, res, next) => {
  console.log("----------Body---------->");
  console.log(req.body);
  console.log("----------Body----------/");
  return next();
};
module.exports = logBody;
