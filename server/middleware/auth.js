import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Un Authorized Access" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

export default authMiddleware;
