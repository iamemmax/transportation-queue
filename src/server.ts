import express, { Request, Response } from "express"
import 'dotenv/config'
import Logger from "morgan"
import cors from "cors"
import "colors"
import userRoutes from "./routes/user.routes"
import connectDb from "./config/Db.connection"
import serverless from 'serverless-http';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(Logger("dev"))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, p Express');
});



// routes
app.use("/api/users", userRoutes)
const PORT = process.env.PORT
app.listen(PORT, async () => {
    console.log(`server started on localhost:${PORT}`.red)
    await connectDb()


})


export default app;