import redis from "../../../shared/redis/redis.js";

export const protect = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const result = await redis.get(`session-${sessionId}`);

    if (!result) {
      return res.status(401).json({
        message: "Session expired or invalid"
      });
    }

    const data = JSON.parse(result);

    req.user = data;

    next();

  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: `Protect middleware error: ${err.message}`
    });
  }
};


