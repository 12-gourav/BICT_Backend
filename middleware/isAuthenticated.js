import JWT from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(400).json({ msg: "Invalid Token" });
    }
    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: decode?.id });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Token" });
    }
    req.id = user?._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Invalid Token" });
  }
};
