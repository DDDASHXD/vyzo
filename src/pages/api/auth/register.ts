// @ts-nocheck

import { connect } from "@/db/dbconfig";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export default async function handler(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = await newUser.save();

    return res
      .status(200)
      .json({ message: "User created successfully", success: true, savedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
}
