import { Result } from "../models/Result.js";

export const CreateResult = async (req, res) => {
  try {
    const { name, father, course, roll, status } = req.body;

    const result = await Result.create({
      name: name,
      fatherName: father,
      rollNumber: roll,
      course: course,
      status: Boolean(status),
    });

    return res
      .status(201)
      .json({ msg: "Result generate successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Result failed to create" });
  }
};

export const UpdateResult = async (req, res) => {
  try {
    const { id, name, father, course, roll, status } = req.body;

    const result = await Result.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        fatherName: father,
        rollNumber: roll,
        course: course,
        status: Boolean(status),
      }
    );

    return res
      .status(201)
      .json({ msg: "Result update successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Result failed to create" });
  }
};

export const getResultbynumber = async (req, res) => {
  try {
    const { roll } = req.query;

    const result = await Result.findOne({ rollNumber: roll });
    if (result) {
      return res.status(200).json({ msg: "Result Found", data: result });
    } else {
      return res.status(400).json({ msg: "Result not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Result not found" });
  }
};

export const getResults = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const size = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * size;

    const result = await Result.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { course: { $regex: query, $options: "i" } },
        { rollNumber: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(size)
      .sort({ createdAt: -1 });

    return res.status(200).json({ msg: "Result data records", data: result });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: error?.resoponse?.data?.msg || error, data: [] });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await Result.findByIdAndDelete({ _id: id });

    return res
      .status(200)
      .json({ msg: "Result Delete Successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error?.resoponse?.data?.msg || error });
  }
};
