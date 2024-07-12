// @ts-nocheck

import jwt from "jsonwebtoken";
import User from "@/models/usermodel";

export const auth = async (token, res) => {
  try {
    if (!token) {
      return res.status(400).json({ message: "No token was provided" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken.id);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return user;
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error });
  }
};
