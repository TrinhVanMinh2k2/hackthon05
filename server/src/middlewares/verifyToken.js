const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  try {
    // Lấy token
    // authorization: Bearer token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role != 1) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền này" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyToken };
