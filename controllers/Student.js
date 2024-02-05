import { Student } from "../models/Student.js";

export const CreateStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      father,
      mother,
      dob,
      gender,
      email,
      phone,
      homePhone,
      address,
      tenPercent,
      tenBoard,
      tenYear,
      enterPercent,
      enterBoard,
      enterYear,
      course,
      duration,
    } = req.body;

    const existUser = await Student.findOne({
      $or: [
        { email: email },
        {
          phone: phone,
        },
        { homePhone: homePhone },
      ],
    });

    if (existUser) {
      return res.status(400).json({ msg: "User Already Exist" });
    }

    const data = await Student.create({
      firstName,
      lastName,
      father,
      mother,
      dob,
      gender,
      email,
      phone,
      homePhone,
      address,
      tenPercent,
      tenBoard,
      tenYear,
      enterPercent,
      enterBoard,
      enterYear,
      course,
      duration,
    });

    return res
      .status(200)
      .json({ msg: "Application Submit Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const GetStudent = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Student.countDocuments();

    const data = await Student.find({})
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Student Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Student is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const SearchStudent = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Student.countDocuments({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { homePhone: { $regex: query, $options: "i" } },
      ],
    });

    const data = await Student.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { homePhone: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Student Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Student is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteStudent = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Student.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "Student Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateStudent = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      father,
      mother,
      dob,
      gender,
      email,
      phone,
      homePhone,
      address,
      tenPercent,
      tenBoard,
      tenYear,
      enterPercent,
      enterBoard,
      enterYear,
      course,
      duration,
    } = req.body;

    const data = await Student.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        father,
        mother,
        dob,
        gender,
        email,
        phone,
        homePhone,
        address,
        tenPercent,
        tenBoard,
        tenYear,
        enterPercent,
        enterBoard,
        enterYear,
        course,
        duration,
      }
    );

    res.status(200).json({ msg: "Student Details Update successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
