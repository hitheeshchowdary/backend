import User from "../models/User.js";

const getUserProfile = async (req, res) => {
  res.json(req.user);
};

export { getUserProfile };
