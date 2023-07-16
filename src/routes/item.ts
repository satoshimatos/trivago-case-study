import { Router, Request, Response } from 'express'
import { itemValidator } from '../validators/ItemValidator'
import { validationResult } from 'express-validator'
import { locationValidator } from '../validators/LocationValidator'

const itemController = require('../controllers/ItemController')

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    let result = await itemController.getList()
    res.status(200).json({'items': result})
})

router.get('/:id', async (req: Request, res: Response) => {
    let result = await itemController.getOne(req.params.id)
    res.status(200).json({'item': result ?? 'Not found'})
})

router.post('/', locationValidator, itemValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
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

export default router