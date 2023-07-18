import { Router, Request, Response } from 'express'

const locationController = require('../controllers/LocationController')
const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
    try {
        let result = await locationController.getOneById(req.params.id)
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

export default router