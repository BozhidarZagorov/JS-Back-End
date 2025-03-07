import { Router } from "express";

import deviceService from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router()

//routes
homeController.get('/', async (req, res)=>{
    // res.send('It works!')
    // res.render('home', {pageTitle:'TechStore | Home'})
    // res.setError('TestErr') //! Bonus

    const latestDevices = await deviceService.getLatest()

    res.render('home', {devices: latestDevices})
})

homeController.get('/about', (req,res)=>{
    res.render('about')
})

homeController.get('/profile', isAuth,async (req,res)=>{
    const ownDevices = await deviceService.getAllByOwnerId({owner: req.user.id})
    const preferredDevice = await deviceService.getAllByOwnerId({preferredBy: req.user.id})


    res.render('profile', {ownDevices, preferredDevice})
})

export default homeController