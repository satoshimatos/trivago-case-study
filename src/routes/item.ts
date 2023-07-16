import { Router, Request, Response } from 'express';

const itemController = require('../controllers/ItemController')

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let result = await itemController.getList()
    res.status(200).json({'items': result})
})

router.post('/', async (req: Request, res: Response) => {
    try {
        let result = await itemController.addItem(req.body)
        res.status(201).json({'body': result})
    } catch (error) {
        res.status(error.code ?? 500).send(error.message)
    }
})

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')
})

export default router;