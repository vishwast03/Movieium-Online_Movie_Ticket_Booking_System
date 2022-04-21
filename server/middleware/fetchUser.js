const jwt = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  // Get the user from jwt token and add the id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, privateKey);
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  }
};

module.exports = fetchUser;
