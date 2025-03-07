import { Router } from "express";

import Disaster from "../models/Disasters.js";

const homeController = Router()

//routes
homeController.get('/', async (req, res)=>{

    // res.render('home', {pageTitle:'TechStore | Home'})

    res.render('home', {setTitle: "Home"})
})

homeController.get("/search", async (req, res) => {
    const disasters = await Disaster.find({});

    res.render("search", { disasters,setTitle: "Search"});
});

homeController.post("/search", async (req, res) => {
    const search = req.body;
    
    let query = {};

    if (search.nameOfDisaster) {
        query.nameOfDisaster = new RegExp(search.nameOfDisaster, "i");
    }

    if (search.typeOfDisaster) {
        query.typeOfDisaster = search.typeOfDisaster;
    }
    
    const disasters = await Disaster.find(query);
    

    res.render("search", { disasters, search,setTitle: "Search"});
});

export default homeController