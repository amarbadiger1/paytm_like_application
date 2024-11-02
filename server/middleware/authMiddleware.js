const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "The auth token is not Found" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    return res.status(403).json(error);
  }
};

module.exports = { authMiddleware };
