import { Exam } from "../models/Exam.js";


export const CreateExam = async (req, res) => {
  try {
    const { title, dis,link } = req.body;

    const existExam = await Exam.findOne({ link:link });

    if (existExam) {
      return res.status(400).json({ msg: "Exam Link Already Exist" });
    }

    const data = await Exam.create({ title: title, discription: dis,link });

    return res.status(201).json({ msg: "Exam Create Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const GetExams = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Exam.countDocuments();

    const data = await Exam.find({})
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Exam Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Exam is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const searchExams = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Exam.countDocuments({
      title: { $regex: query, $options: "i" },
    });

    const data = await Exam.find({ title: { $regex: query, $options: "i" } })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Exam search Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Exam is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteExam = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Exam.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "Exam Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateExam = async (req, res) => {
  try {
    const { id, title, dis,link } = req.body;

    const data = await Exam.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        discription: dis,
        link
      }
    );

    return res.status(200).json({ msg: "Exam Update Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};


