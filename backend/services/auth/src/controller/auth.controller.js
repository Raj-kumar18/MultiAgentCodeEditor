// controllers/auth.controller.js
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.models.js";
import crypto from "crypto";
import redis from "../../../../shared/redis/redis.js";


const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }
    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });
    if (!user) {
      user = new User({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
      await user.save();
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        name: user.name,
        _id: user._id,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      SESSION_TTL_SECONDS
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_TTL_SECONDS * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log("Login error~~:", error);

    return res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
  
    
    await redis.del(`session-${sessionId}`);

    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout error",
    });
  }
};