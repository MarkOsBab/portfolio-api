import { ProjectController } from "../controllers/project.controller.js";
import express, { Request, Response }  from "express";
import { uploader } from "../utils/utils.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const projectController = new ProjectController();

router.get('/', async (req: Request, res: Response) => {
    await projectController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await projectController.getOne(req, res);
});

router.post('/', authToken(), uploader.array('thumbnails'), async (req:Request, res: Response) => {
    await projectController.create(req, res);
});

router.put('/:id', authToken(), uploader.array('thumbnails'), async (req:Request, res: Response) => {
    await projectController.update(req, res);
});

router.delete('/:id', authToken(), async (req: Request, res: Response) => {
    await projectController.delete(req, res);
});

export default router;