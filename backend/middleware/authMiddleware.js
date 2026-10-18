import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

const protect = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, "Not authorized, user no longer exists");

  req.user = user;
  next();
};

export default protect;
