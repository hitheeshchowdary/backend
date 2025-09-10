import cron from "node-cron";
import Member from "../models/Member.js"; 

cron.schedule("0 0 * * 1", async () => {
  try {
    await Member.updateMany({}, { $set: { weeklyPoints: 0 } });
  } catch (err) {
    console.error(err);
  }
});

cron.schedule("0 0 1 * *", async () => {
  try {
    await Member.updateMany({}, { $set: { monthlyPoints: 0 } });
  } catch (err) {
    console.error(err);
  }
});
