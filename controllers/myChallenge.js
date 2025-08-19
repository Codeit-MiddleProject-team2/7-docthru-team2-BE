import { getMyChallenges } from "../services/myChallenge.js";

export const myChallengesApply = async (req, res, next) => {
  const userId = req.user.id;
  const userIsAdmin = req.user.isAdmin;

  let { status, keyword, orderBy } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (orderBy && orderBy !== "latest") {
    status = null;
  } else if (status) {
    status = status.toUpperCase();
  }

  let result;
  try {
    if (userIsAdmin) {
      result = await getMyChallenges({
        status,
        keyword,
        page: Number(page),
        limit: Number(limit),
        orderBy,
      });
    } else {
      result = await getMyChallenges({
        userId,
        status,
        keyword,
        page: Number(page),
        limit: Number(limit),
        orderBy,
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
