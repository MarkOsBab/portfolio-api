import { ProjectController } from "../controllers/project.controller.js";
import express, { Request, Response }  from "express";
import { uploader } from "../utils/utils.js";

const router = express.Router();
const projectController = new ProjectController();

router.get('/', async (req: Request, res: Response) => {
    await projectController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await projectController.getOne(req, res);
});

router.post('/', uploader.array('thumbnails'), async (req:Request, res: Response) => {
    await projectController.create(req, res);
});

export default router;