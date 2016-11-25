import multer from 'multer';
import path from 'path';


export const ICONS_PATH = 'public/icons/';
const fileFilter = (req, file, cb)=> {
  const filetypes = /jpeg|jpg/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
};
const limits = {fileSize:80000}; //bytes

export const uploadIcon = multer({ dest: ICONS_PATH, fileFilter, limits });
