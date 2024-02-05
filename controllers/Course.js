import { Course } from "../models/Course.js";
import cloudinary from "cloudinary";

export const CreateCourse = async (req, res) => {
  try {
    const {
      name,
      category,
      duration,
      rating,
      price,
      mode,
      users,
      shortDis,
      aboutDis,
      benifit,
      hash,
    } = req.body;

    const { img } = req.files;

    const existCourse = await Course.findOne({ name: name });
    if (existCourse) {
      return res.status(400).json({ msg: "Course Already Exist" });
    }
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "raw", // Specify 'raw' for buffer data
          public_id: `backup_${Date.now()}`,
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(400).json({ msg: error });
          } else {
            console.log(result);
            try {
              const data = await Course.create({
                name: name,
                category: category,
                duration: duration,
                rating: rating,
                mode: mode,
                users: users,
                price: price,
                shortDis: shortDis,
                aboutDis: aboutDis,
                benifit: benifit,
                img: {
                  public_id: result?.public_id,
                  url: result?.url,
                  hash: hash,
                },
              });

              return res
                .status(201)
                .json({ msg: "Course Create Successfully", data });
            } catch (error) {
              console.error(error);
              res.status(500).json({ msg: "Internal server error" });
            }
          }
        }
      )
      .end(img.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export const GetCourse = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Course.countDocuments({});

    const data = await Course.find({})
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Course Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Course is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateCourse = async (req, res) => {
  try {
    const {
      id,
      name,
      category,
      duration,
      rating,
      mode,
      users,
      shortDis,
      aboutDis,
      benifit,
      flag,
      price,
      hash,
    } = req.body;

    if (flag === "image") {
      const { img } = req.files;

      const data = await Course.findById({ _id: id });
      let imgUp = await cloudinary.v2.uploader.destroy({
        public_id: data?.img?.public_id,
      });
      cloudinary.v2.uploader
        .upload_stream(
          {
            resource_type: "raw", // Specify 'raw' for buffer data
            public_id: `backup_${Date.now()}`,
          },
          async (error, result) => {
            if (error) {
              console.error(error);
              return res.status(400).json({ msg: error });
            } else {
              console.log(result);
              try {
                const data = await Course.findByIdAndUpdate(
                  { _id: id },
                  {
                    name: name,
                    category: category,
                    duration: duration,
                    rating: rating,
                    mode: mode,
                    price: price,
                    users: users,
                    price: price,
                    shortDis: shortDis,
                    aboutDis: aboutDis,
                    benifit: benifit,
                    img: {
                      public_id: result?.public_id,
                      url: result?.url,
                      hash: hash,
                    },
                  }
                );

                return res
                  .status(201)
                  .json({ msg: "Course Update Successfully", data });
              } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "Internal server error" });
              }
            }
          }
        )
        .end(img.data);
    } else {
      const data = await Course.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          category: category,
          duration: duration,
          rating: rating,
          price: price,
          mode: mode,
          users: users,
          shortDis: shortDis,
          aboutDis: aboutDis,
          benifit: benifit,
        }
      );
      return res.status(200).json({ msg: "Course Update Successfully", data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteCourse = async (req, res) => {
  try {
    const { id } = req.query;

    const imgdata = await Course.findById({ _id: id });

    const imgDelete = await cloudinary.v2.uploader.destroy({
      public_id: imgdata?.img?.public_id,
    });

    const data = await Course.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "Course Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Course.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { price: { $regex: query, $options: "i" } },
      ],
    });

    const data = await Course.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { price: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Course Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Course is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const GetHomeCourse = async (req, res) => {
  try {
    const data = await Course.find({}).limit(6).sort({ createdAt: -1 });

    if (data) {
      return res.status(200).json({ msg: "Course Fetch Successfully", data });
    } else {
      res.status(200).json({ msg: "Course is Empty", data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
