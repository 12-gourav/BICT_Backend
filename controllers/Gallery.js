import { Gallery } from "../models/Gallery.js";
import cloudinary from "cloudinary";

export const CreateGallery = async (req, res) => {
  try {
    const { caption, hash } = req.body;

    const { img } = req.files;

    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "image", 
          public_id: `backup_${Date.now()}`,
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(400).json({ msg: error });
          } else {
            console.log(result);
            try {
              const data = await Gallery.create({
                caption: caption,
                img: {
                  public_id: result?.public_id,
                  url: result?.url,
                  hash: hash,
                },
              });

              return res
                .status(201)
                .json({ msg: "Image Upload Successfully", data });
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

export const GetGallery = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Gallery.countDocuments();

    const data = await Gallery.find()
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Gallery Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Gallery is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateGallery = async (req, res) => {
  try {
    const { id, caption, flag, hash } = req.body;

    if (flag === "image") {
      const { img } = req.files;
      const data = await Gallery.findById({ _id: id });
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
                const data = await Gallery.findByIdAndUpdate(
                  { _id: id },
                  {
                    caption: caption,
                    img: {
                      public_id: result?.public_id,
                      url: result?.url,
                      hash: hash,
                    },
                  }
                );

                return res
                  .status(201)
                  .json({ msg: "Image Update Successfully", data });
              } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "Internal server error" });
              }
            }
          }
        )
        .end(img.data);
    } else {
      const data = await Gallery.findByIdAndUpdate(
        { _id: id },
        {
          caption: caption,
        }
      );
      return res.status(200).json({ msg: "Image Update Successfully", data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteGallery = async (req, res) => {
  try {
    const { id } = req.query;

    const data = await Gallery.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "Course Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const SearchGallery = async (req, res) => {
  try {
    const { page, limit, query } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Gallery.countDocuments({
      $or: [{ caption: { $regex: query, $options: "i" } }],
    });

    const data = await Gallery.find({
      $or: [{ caption: { $regex: query, $options: "i" } }],
    })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Gallery Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Gallery is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
