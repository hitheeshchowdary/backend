import Member from "../models/Member.js";

const getAllTimeLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Member.find({})
      .sort({ overAllPoints: -1 })
      .limit(10)
      .select("name email role overAllPoints");
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

const getWeeklyLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Member.find({})
      .sort({ weeklyPoints: -1 })
      .limit(10)
      .select("name email role weeklyPoints");
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

const getMonthlyLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Member.find({})
      .sort({ monthlyPoints: -1 })
      .limit(10)
      .select("name email role monthlyPoints");
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

export { getAllTimeLeaderboard, getWeeklyLeaderboard, getMonthlyLeaderboard };
