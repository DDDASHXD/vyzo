//@ts-nocheck

import { connect } from "@/db/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export default async function handler(req, res) {
  if ((req.method = "POST")) {
    try {
      const { email, password, remember } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: remember ? "365d" : "1d",
      });

      return res.status(200).json({ message: "Successfully logged in", token });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
  }
}
