import cloudinary from "cloudinary";
import { Certificate } from "../models/Certificate.js";

export const CreateCertificate = async (req, res) => {
  try {
    const { name, course, category, certificate } = req.body;

    const { img } = req.files;
    console.log(img);
    const exist = await Certificate.findOne({ certificate: certificate });
    if (exist) {
      return res.status(400).json({ msg: "Certificate Already Exist" });
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
              const data = await Certificate.create({
                name: name,
                course: course,
                category: category,
                certificate: certificate,
                img: {
                  public_id: result?.public_id,
                  url: result?.url,
                },
              });

              return res
                .status(201)
                .json({ msg: "Certificate Upload Successfully", data });
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

export const GetCertificates = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Certificate.countDocuments({});

    const data = await Certificate.find({})
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Certificates Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Certificates is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const UpdateCertificate = async (req, res) => {
  try {
    const { id, name, course, category, certificate, flag } = req.body;
    console.log(flag);
    if (flag == "z") {
      const { img } = req.files;
      const data = await Certificate.findById({ _id: id });

      let imgUp = await cloudinary.v2.uploader.destroy({
        public_id: data?.img?.public_id,
      });
      console.log(imgUp);
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
                const data = await Certificate.findByIdAndUpdate(
                  { _id: id },
                  {
                    name: name,
                    course: course,
                    category: category,
                    certificate: certificate,
                    img: {
                      public_id: result?.public_id,
                      url: result?.url,
                    },
                  }
                );

                return res
                  .status(201)
                  .json({ msg: "Certificate Update Successfully", data });
              } catch (error) {
                console.error(error);
                return res.status(500).json({ msg: "Internal server error" });
              }
            }
          }
        )
        .end(img.data);
    }

    const data = await Certificate.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        course: course,
        category: category,
        certificate: certificate,
      }
    );
    return res
      .status(200)
      .json({ msg: "Certificate Update Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const DeleteCertificate = async (req, res) => {
  try {
    const { id } = req.query;

    const exist = await Certificate.findById({ _id: id });

    const img = await cloudinary.v2.uploader.destroy({
      public_id: exist?.img?.public_id,
    });

    const data = await Certificate.findByIdAndDelete({ _id: id });

    return res
      .status(200)
      .json({ msg: "Certificate Delete Successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const SearchCertificate = async (req, res) => {
  try {
    const { digit } = req.query;

    const data = await Certificate.find({ certificate: digit });
    if (data) {
      return res.status(200).json({ msg: "Certificate Found", data });
    } else {
      return res.status(400).json({ msg: "Certificate not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const SearchCertificates = async (req, res) => {
  try {
    const { page, limit, query } = req.query;



    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * pageLimit;

    const total = await Certificate.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { course: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { certificate: { $regex: query, $options: "i" } },
      ],
    });

    const data = await Certificate.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { course: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { certificate: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    if (data) {
      return res
        .status(200)
        .json({ msg: "Certificates Fetch Successfully", data, total });
    } else {
      res.status(200).json({ msg: "Certificates is Empty", data: [], total });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

export const singleCertificate = async (req, res) => {
  try {
    const { query } = req.query;

    const data = await Certificate.findOne({ certificate: query });
    if (data) {
      return res.status(200).json({ msg: "Certificate Found!", data: data });
    } else {
      res.status(200).json({ msg: "Certificate Not Found", data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
