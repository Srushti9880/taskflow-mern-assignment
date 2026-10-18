import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw new ApiError(409, "Email already registered");

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: { user: userResponse(user), token: generateToken(user._id) },
  });
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: userResponse(user), token: generateToken(user._id) },
  });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: { user: userResponse(req.user) },
  });
};
