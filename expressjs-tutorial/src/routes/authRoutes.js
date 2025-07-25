import { Router } from "express";
import { User } from "../model/user.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationToken } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import {
  sendPasswordResetEmail,
  sendResetSuccesEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hrs
    });
    console.log("user", user);

    await user.save();

    generateTokenAndSetCookies(res, user._id);
    sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User Created SuccesFully",
      username: name,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

authRouter.post("/verifyEmail", async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or Token is expired" });
    }
    user.isVerified = true;
    //after verified there is no need of token and time in db
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookies(res, user._id);

    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out Succesfully" });
});

authRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ hasError: "true", message: "User not found" });
    }
    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1hrs
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      hasError: false,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forget Password", error);
    res.status(400).json({ hasError: true, message: error.message });
  }
});

authRouter.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ hasError: "true", message: "Invalid or expired reset token" });
    }

    //update password
    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //send email
    await sendResetSuccesEmail(user.email);
    res.status(200).json({
      hasError: false,
      message: "Password reset Succesfully",
    });
  } catch (error) {
    console.log("Error in forget Password", error);
    res.status(400).json({ hasError: true, message: error.message });
  }
});

authRouter.post("/check-auth", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default authRouter;
