import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    // file multer se aayi
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // cloudinary upload
    const result = await cloudinary.uploader.upload(file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};
