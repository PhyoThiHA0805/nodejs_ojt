import multer from "multer";

const fileStorage = multer.diskStorage({
    destination: "D:/nodejs/nodejs_ojt/Day14/imageUpload/apiUploads",
    filename : (req, file, callback) => {
        const fileType = file.mimetype.split("/")[1];

        const fileName = file.fieldname + "-" + Date.now() + "." + fileType;

        callback(null, fileName);
    },
})
const upload = multer({ storage: fileStorage }).single("fileUpload");

export default upload;