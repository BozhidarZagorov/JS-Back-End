import { Router } from "express";

import deviceService from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router()

//routes
homeController.get('/', async (req, res)=>{
    // res.send('It works!')
    // res.render('home', {pageTitle:'TechStore | Home'})
    res.setError('TestErr') //! Bonus

    const latestDevices = await deviceService.getLatest()               // todo change name devices

    res.render('home', {devices: latestDevices})
})

// homeController.get('/about', (req,res)=>{
//     res.render('about')
// })

homeController.get('/profile', isAuth,async (req,res)=>{                    // todo change name devices
    const ownDevices = await deviceService.getAllByOwnerId({owner: req.user.id})
    const preferredDevice = await deviceService.getAllByOwnerId({preferredBy: req.user.id})


    res.render('profile', {ownDevices, preferredDevice})
})

homeController.get('/search',async (req,res)=>{                    // todo change name devices
    const data = await deviceService.searchBar()


    res.render('search', {data})
})

homeController.post('/search',async (req,res)=>{                    // todo change name devices
    const searchParams = req.query

    const data = await deviceService.searchBar(searchParams)

    res.render('search', {data})
})

// homeController.get('/search', async (req, res) => {
//     const filter = req.query;
//     const recipe = await deviceService.getSearch(filter);

//     res.render('search', { recipe, filter });
// });



export default homeController