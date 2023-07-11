import multer, {diskStorage, FileFilterCallback} from 'multer';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import jwt, { Secret } from "jsonwebtoken";
import UserInterface from '../interfaces/user.interface.js';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/images`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuid()+ext);
  },
});

export const uploader = multer({ storage });
export default __dirname;

export const createHash = (password: string): string => 
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user: UserInterface | null, password: string): boolean => 
  bcrypt.compareSync(password, user?.password as string);

export const generateToken = (user: UserInterface, expiresIn: string) => {
  const token = jwt.sign({ user }, config.secretKey as Secret, { expiresIn });
  return token;
} 

export const generateUUID = () => {
  const token: string = uuid();
  return token;
}