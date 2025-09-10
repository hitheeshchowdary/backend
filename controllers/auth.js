
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Member from "../models/Member.js"; 

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password, role });

    await Member.create({
      name,
      email,
      role: role || "member",
    });

    res.status(201).json({
      token: generateToken(user._id),
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

export { registerUser, loginUser };


