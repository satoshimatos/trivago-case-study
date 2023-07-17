import express, { Application, Response } from 'express'
import itemsRouter from './routes/item'
import bookingRouter from './routes/booking'

const app: Application = express()

app.use(express.json())

app.use('/items', itemsRouter)
app.use('/booking', bookingRouter)

const port = process.env.PORT || 3333
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export default app