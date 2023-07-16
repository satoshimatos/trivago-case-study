import { Router, Request, Response } from 'express';

const itemController = require('../controllers/ItemController')

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let result = await itemController.getList()
    res.status(200).json({'items': result})
})

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')
})

export default router;