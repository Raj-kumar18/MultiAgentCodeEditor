import { getAuth } from "firebase-admin/auth";
import crypto from "crypto";
import { app } from "../config/firebase.js";
import User from "../models/user.models.js";
import redis from "../../../../shared/redis/redis.js";

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 din

const sessionKey = (sessionId) => `session-${sessionId}`;

// Login aur logout dono yahi use karenge, tabhi clearCookie sahi kaam karega
const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // prod (HTTPS) mein true
  sameSite: "strict",
  path: "/",
};
// -------------------------------------------------------

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    // Invalid/expired Firebase token par 401 do, 500 nahi
    let decoded;
    try {
      decoded = await getAuth(app).verifyIdToken(token);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Atomic upsert: user nahi hai to create, hai to wahi return
    const user = await User.findOneAndUpdate(
      { firebaseUid: decoded.uid },
      {
        $setOnInsert: {
          firebaseUid: decoded.uid,
          name: decoded.name || decoded.email?.split("@")[0] || "User",
          email: decoded.email,
          avatar: decoded.picture,
        },
      },
      { new: true, upsert: true }
    );

    // Purana session Redis mein pada ho to hata do
    const oldSessionId = req.cookies?.session;
    if (oldSessionId) {
      await redis.del(sessionKey(oldSessionId));
    }

    const sessionId = crypto.randomUUID();

    // ioredis syntax. Agar node-redis (v4+) hai to:
    // await redis.set(key, value, { EX: SESSION_TTL_SECONDS });
    await redis.set(
      sessionKey(sessionId),
      JSON.stringify({
        name: user.name,
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      SESSION_TTL_SECONDS
    );

    // Cookie maxAge milliseconds mein, Redis TTL ke barabar
    res.cookie("session", sessionId, {
      ...sessionCookieOptions,
      maxAge: SESSION_TTL_SECONDS * 1000,
    });

    // Sirf safe fields frontend ko bhejo
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login error",
      // SIRF debugging ke liye, kaam hone ke baad hata dena
      debug: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    // Cookie nahi hai => user already logged out hai
    if (!sessionId) {
      res.clearCookie("session", sessionCookieOptions);
      return res.status(200).json({
        success: true,
        message: "Already logged out",
      });
    }

    // Server-side session invalidate karo
    await redis.del(sessionKey(sessionId));

    // Browser se cookie hatao
    res.clearCookie("session", sessionCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Logout error",
    });
  }
};