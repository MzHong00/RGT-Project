import { Router } from "express"

const route = Router();

export const book = (app: Router) => {
    app.use('/book', route)
}