import { Router, Request, Response } from 'express'
import { itemValidator } from '../validators/ItemValidator'
import { validationResult } from 'express-validator'
import { locationValidator } from '../validators/LocationValidator'

const itemController = require('../controllers/ItemController')
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        let result = await itemController.getList()
        res.status(200).json({
            "success": true,
            "items": result
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        let result = await itemController.getOne(req.params.id)
        if (result) {
            res.status(200).json({
                "success": true,
                "body": result
            })
        } else {
            res.status(404).json({
                "success": false,
                "message": "Item not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

router.post('/', locationValidator, itemValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            "success": false,
            "errors": errors.array()
        })
    }
    try {
        let result = await itemController.saveItem(req.body)
        res.status(201).json({
            "success": true,
            "response": result
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

router.put('/:id', locationValidator, itemValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            "success": false,
            "errors": errors.array()
        })
    }
    try {
        let result = await itemController.saveItem(req.body, req.params.id)
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": "Item not found"
            })
        } else {
            res.status(200).json({
                "success": true,
                "response": result
            })
        }
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        let result = await itemController.deleteItem(req.params.id)
        if (!result) {
            res.status(404).json({
                "success": false,
                "message": "Item not found"
            })
        }
        res.status(204).send()
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

export default router