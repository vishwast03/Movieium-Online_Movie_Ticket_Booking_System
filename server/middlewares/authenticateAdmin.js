require("dotenv").config();

const authenticateAdmin = (req, res, next) => {
  const password = req.header("admin-password");

  if (password == process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res
      .status(401)
      .send({ error: "Please authenticate using a valid password" });
  }
};

module.exports = authenticateAdmin;
