import { Router, Request, Response } from 'express'

const bookingController = require('../controllers/BookingController')

const router = Router()

router.post('/book/:id', async (req: Request, res: Response) => {
    try {
        await bookingController.book(req.params.id)
        res.status(200).json({
            "success": true,
            "message": "Room booked successfully"
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

router.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')
})


export default router