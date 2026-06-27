import multer from "multer";
import path from "node:path"

export const localfileupload = ()=> {
const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            console.log(file);
            cb(null,path.resolve("./uploads"));
        },

    filename:(req,file,cb)=>{

        const UniqueFileName = Date.now() +"-" + Math.round(Math.random()*1e9) + "-" + file.originalname
            cb(null,UniqueFileName)
        }
    })
    
    return multer({storage})
}