import { Router, Request, Response } from 'express'

const bookingController = require('../controllers/BookingController')

const router = Router()

router.post('/item/:id', async (req: Request, res: Response) => {
    try {
        let response = await bookingController.book(req.params.id)
        let responseBody = {}
        switch (response) {
            case 200:
                responseBody = {
                    "success": true,
                    "message": "Room booked successfully"
                }
                break
            case 403:
                responseBody = {
                    "success": false,
                    "message": "No rooms available for booking"
                }
                break
            case 404:
                responseBody = {
                    "success": false,
                    "message": "Item not found"
                }
                break
            default:
        }
        res.status(response).json(responseBody)
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
})

export default router