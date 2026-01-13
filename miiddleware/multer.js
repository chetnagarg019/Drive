import multer from "multer";

// temporary local storage
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;
