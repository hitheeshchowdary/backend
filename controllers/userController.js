import User from "../models/User.js";


const getUserProfile = async (req, res) => {
  res.json(req.User);
};

export { getUserProfile };
