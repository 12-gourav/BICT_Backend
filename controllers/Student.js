import { AddmissionTemplate } from "../html/index.js";
import { Student } from "../models/Student.js";
import { sendMails } from "../utils/sendMail.js";

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
      $or: [{ email: email }],
    });

    if (existUser) {
      return res.status(400).json({ msg: "User Already Exist" });
    }

    const usedIds = new Set();

    function generateUniqueId() {
      let id;
      do {
        id = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit number
      } while (usedIds.has(id)); // Ensure the ID is unique
      usedIds.add(id); // Store the ID as used
      return id;
    }
    const addmissionID = generateUniqueId();

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
      addmissionID: addmissionID,
    });

    let subject =
      "Your Application is Under Process - Bashar Institute of Computers";
    let name = firstName + lastName;
    await sendMails(
      email,
      subject,
      "",
      AddmissionTemplate(
        name,
        "Bashar Institute",
        "bashar.info.bic@gmail.com",
        "8127131213",
        "https://bict.org.in/",
        addmissionID
      )
    );

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
      status
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
        status:status
      }
    );

    res.status(200).json({ msg: "Student Details Update successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const recentAddmission = async (req, res) => {
  try {
    const result = await Student.find({}).limit(8).sort({ createdAt: -1 });
    res.status(200).json({ msg: "Students Fetch Successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};



export const checkaddmission = async (req, res) => {
  try {
    const {id} = req.query;
    const result = await Student.find({addmissionID:id},'firstName lastName course status');

    res.status(200).json({ msg: "Students Record Successfully", data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};