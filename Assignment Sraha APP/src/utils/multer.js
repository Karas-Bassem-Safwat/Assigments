import multer from "multer";
import path from "node:path"

// Allowed mime types (extend as needed)
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const localfileupload = ()=> {
const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null,path.resolve("./uploads"));
        },

    filename:(req,file,cb)=>{

        const UniqueFileName = Date.now() +"-" + Math.round(Math.random()*1e9) + "-" + file.originalname
            cb(null,UniqueFileName)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new multer.MulterError(
                "LIMIT_UNEXPECTED_FILE",
                `Unsupported file type: ${file.mimetype}`
            ));
        }
        cb(null, true);
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: MAX_FILE_SIZE,
            files: 1,
        },
    });
}