/**======================
 *!    Importing Files
 *========================**/
const { JWTKEY } = process.env;
const User = require("../model/user.Model");
const jwt = require("jsonwebtoken");

/**========================================================================
 *                          Bearer Token Authentication
 *========================================================================**/
exports.verifyToken = async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (header === undefined) {
      return res.status(400).json({
        sucess: false,
        message: "Unauthorized Request!",
        data: [],
      });
    } else {
      const token = header.replace("Bearer ", "");
      jwt.verify(token, JWTKEY, async (err, decoded) => {
        if (err) {
          return res.status(400).json({
            sucess: false,
            message: err.message,
            data: [],
          });
        } else {
          const _id = decoded._id;
          if (!_id) {
            res.status(400).json({
              sucess: false,
              error: "Authentication Failed ",
              data: [],
            });
          } else {
            const checkUser = await User.findOne({ _id });
            if (!checkUser) {
              res.status(400).json({
                sucess: false,
                error: "Authentication Failed ",
                data: [],
              });
            } else {
              req.user = checkUser;
             console.log(req.user);
              next();
            }
          }
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server is not responding",
    });
  }
};
