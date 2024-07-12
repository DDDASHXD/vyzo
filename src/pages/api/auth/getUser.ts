// @ts-nocheck

import { connect } from "@/db/dbconfig";
import User from "@/models/usermodel";
import jwt from "jsonwebtoken";
import { auth } from "../tokenauth";

connect();

export default async function handler(req, res) {
  const { token } = req.body;
  try {
    const user = await auth(token, res);

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error ocurred while authenticating" });
  }
}
