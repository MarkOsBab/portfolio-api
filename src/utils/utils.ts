import multer, {diskStorage, FileFilterCallback} from 'multer';
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
export default __dirname;

export const createHash = (password: string): string => 
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user: any, password: string): boolean => 
  bcrypt.compareSync(password, user.password);