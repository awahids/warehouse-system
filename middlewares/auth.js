const Jwt = require("jsonwebtoken");

module.exports = {
  authToken: async (req, res, next) => {
    const bearerToken = req.header("Authorization");
    try {
      const token = bearerToken.replace("Bearer ", "");
      Jwt.verify(token, process.env.PWD_TOKEN, (err, res) => {
        if (err) {
          return res.status(401).json({
            status: "failed",
            message: "Unauthorized",
          });
        }
        req.user = res;
        next();
      });
    } catch (error) {
      console.log("🚀 ~ file: auth.js ~ line 19 ~ authToken: ~ error", error);
      res.status(401).json({
        status: "failed",
        message: "Please Log in or register",
      });
    }
  },
};
