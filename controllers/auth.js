
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Member from "../models/Member.js"; 
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });

    const member = await Member.create({
      user: user._id,
      name,
      email,
      role,
    });

    user.member = member._id;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "🎉 Welcome to Our App!",
      html: `<h2>Welcome, ${user.name}!</h2>
             <p>Your account is ready. Click below to login:</p>
             <a href="${process.env.FRONTEND_URL}/login">Login</a>`,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user,
      member,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "🔑 Password Reset",
      html: `<h2>Hello, ${user.name}</h2>
             <p>You requested to reset your password. Click below to reset it:</p>
             <a href="${resetUrl}" style="padding:10px 20px; background:#007BFF; color:white; text-decoration:none;">Reset Password</a>
             <p>This link will expire in 15 minutes.</p>`,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password; 
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export { registerUser, loginUser, forgotPassword, resetPassword };


