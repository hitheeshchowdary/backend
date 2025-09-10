import Member from "../models/Member.js";

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find({})
    res.json(members);
  } catch (err) {
    next(err);
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id)

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    next(err);
  }
};

export { getMembers, getMemberById };

