import { Router } from "express"

import disasterService from "../services/disasterService.js"
import { getErrorMessage } from "../utils/errorUtils.js"
import { isAuth } from "../middlewares/authMiddleware.js"

const disasterController = Router()

disasterController.get('/', async (req,res)=>{
    const disasters = await disasterService.getAll()

    res.render('disasters/catalog', {disasters})
})

disasterController.get('/create', (req,res)=>{
    res.render('disasters/create',{ setTitle: "Create"})
})

disasterController.post('/create',async (req,res)=>{
    const disasterData = req.body
    const userId = req.user.id

    try {
        await disasterService.create(disasterData, userId)
        
        res.redirect('/disasters')
    } catch (err) {
        res.render('disasters/create', {error: getErrorMessage(err), disaster: disasterData,setTitle: "Create"})
    }
})

disasterController.get('/:disasterId/details', async (req,res)=>{
    const disasterId = req.params.disasterId

    const disaster = await disasterService.getOne(disasterId)

    const isOwner = req.user && req.user.id === disaster.owner.toString()
    const isPreferred = disaster.interestedList.includes(req.user?.id)

    res.render('disasters/details', {disaster, isOwner, isPreferred, setTitle: "Details"})
})

disasterController.get('/:disasterId/interested', isAuth, async (req,res)=>{
    const disasterId = req.params.disasterId
    const userId = req.user.id

    try {
        await disasterService.prefer(disasterId,userId)

    } catch (err) {
        res.setError(getErrorMessage(err))

    }
    
    res.redirect(`/disasters/${disasterId}/details`)
})

disasterController.get('/:disasterId/delete', async (req,res)=>{
    const disasterId = req.params.disasterId

    try {
        await disasterService.remove(disasterId, req.user.id)
        
        res.redirect('/disasters')
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect(`/disasters/${disasterId}/details`)
    }
})

disasterController.get('/:disasterId/edit', isAuth,async (req,res)=>{
    const disasterId = req.params.disasterId
    const disaster = await disasterService.getOne(disasterId)

    const ownerId = disaster.owner.toString()
    const userId = req.user.id

    const type = getTypeViewData(disaster.typeOfDisaster);

    if (ownerId !== userId) {
        res.setError('You are not the owner of this offer!')
        return res.redirect(`/disasters/${disasterId}/details`)
    }

    res.render('disasters/edit', {disaster, type,setTitle: "Edit"})
})

disasterController.post('/:disasterId/edit', isAuth, async(req,res)=>{
    const disasterId = req.params.disasterId
    const userId = req.user.id
    const disasterData = req.body

    try {
        await disasterService.update(disasterId,userId,disasterData)
        
        return res.redirect(`/disasters/${disasterId}/details`)
    } catch (err) {
        const type = getTypeViewData(disasterData.typeOfDisaster);

        res.render('disasters/edit', {disaster:disasterData, type, setTitle: "Edit", error: getErrorMessage(err)})
    }
})


export function getTypeViewData(typeOfDisaster) {
    const typeMap = {
        "Wildfire": 'Wildfire',
        "Flood": 'Flood',
        "Earthquake": 'Earthquake',
        "Hurricane": 'Hurricane',
        "Drought": 'Drought',
        "Tsunami": 'Tsunami',
        "Other": 'Other',
    };

    const typeValue = Object.keys(typeMap).map(value => ({
        value,
        label: typeMap[value],
        selected: value === typeOfDisaster ? 'selected' : '',
    }))

    return typeValue;
}



export default disasterController