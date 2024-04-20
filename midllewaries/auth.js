const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req?.headers?.autorization;
  try {
    const isCorrect = jwt.verify(token, process.env.SECRET);
    if (!isCorrect) {
      throw new Error();
    }
    req.body.info = isCorrect.user;
    next();
  } catch (error) {
    res.json({
      message: null,
      error: `К сожалению у вас нет доступа к этому разделу !!!`,
    });
  }
}

module.exports = auth;
