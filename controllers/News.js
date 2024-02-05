import { News } from "../models/News.js";

export const CreateNews = async (req, res) => {
  try {
    const { title, dis } = req.body;

    const existnews = await News.findOne({ title: title });

    if (existnews) {
      return res.status(400).json({ msg: "News Already Exist" });
    }

    const data = await News.create({ title: title, dis: dis });

    return res.status(201).json({ msg: "News Create Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const GetNews = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await News.countDocuments();

    const data = await News.find({})
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "News Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "News is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const searchNews = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await News.countDocuments({
      title: { $regex: query, $options: "i" },
    });

    const data = await News.find({ title: { $regex: query, $options: "i" } })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "News search Successfully", data, total });
    } else {
      res.status(200).json({ msg: "News is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteNews = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await News.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "News Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateNews = async (req, res) => {
  try {
    const { id, title, dis } = req.body;

    const data = await News.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        dis: dis,
      }
    );

    return res.status(200).json({ msg: "News Update Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
