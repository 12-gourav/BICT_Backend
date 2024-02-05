import JWT from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = User.find({ email });
    if (exist) {
      return res.status(400).json({ msg: "Email already Exist" });
    }
    const data = await User.create({
      name: name,
      email: email,
      password: password,
    });

    res.status(201).json({ msg: "User Create Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    if (user?.password !== password) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }

    const token = JWT.sign(
      {
        id: user?._id,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res
      .status(200)
      .json({ msg: "Login Successfull", data: user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const LoadUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.id });
    if (user) {
      return res.status(200).json({ msg: "user login", data: user });
    } else {
      return res.status(400).json({ msg: "user logout" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
