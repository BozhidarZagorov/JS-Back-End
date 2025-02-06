import { Router } from "express";

const homeController = Router()

//routes
homeController.get('/', (req, res)=>{
    // res.send('It works!')
    // res.render('home', {pageTitle:'TechStore | Home'})
    res.setError('TestErr') //! Bonus
    res.render('home')
})

export default homeController