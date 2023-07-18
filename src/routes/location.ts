import { Router, Request, Response } from 'express'
import { getCache, setCache } from '../services/cacheModule'

const locationController = require('../controllers/LocationController')
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const cacheKey = JSON.stringify(req.query);
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                items: cachedData,
            });
        }

        let result = await locationController.getList()
        setCache(cacheKey, result, 60);
        console.log('Serving from server')
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
        const cacheKey = JSON.stringify(req.query);
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                items: cachedData,
            });
        }

        let result = await locationController.getOneById(req.params.id)
        if (result) {
            setCache(cacheKey, result, 60);
            console.log('Serving from server')
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