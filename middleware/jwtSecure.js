import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //fetch user
      req.user = await User.findById(decoded.userid).select("-passwordHash");

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not Authorized Token Failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not Authorized Method Failed" });
  }
};

//test if is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Application Crashed, something went wrong" });
  }
};

//error handle
const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(500).json({ message: "This user is not authorized" });
  }
  if (err.name === "ValidationError") {
    return res.status(500).json({ message: err });
  }
  return res.status(500).json({ message: err });
  next();
};
export { protect, errorHandler, admin };
