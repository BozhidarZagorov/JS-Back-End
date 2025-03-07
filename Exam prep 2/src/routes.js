import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import deviceController from "./controllers/deviceController.js";   // todo change import

const routes = Router()

routes.use(homeController)
routes.use('/auth',authController)
routes.use('/devices',deviceController)                 // todo change controllers name
routes.all('*', (req,res)=>{
    res.render('404')
})

export default routes