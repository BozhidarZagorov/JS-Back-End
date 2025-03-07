import { Router } from "express"

import deviceService from "../services/deviceService.js"
import { getErrorMessage } from "../utils/errorUtils.js"
import { isAuth } from "../middlewares/authMiddleware.js"

const deviceController = Router()

deviceController.get('/', async (req,res)=>{
    const devices = await deviceService.getAll()

    res.render('devices/catalog', {devices})
})

deviceController.get('/create', (req,res)=>{
    res.render('devices/create')
})

deviceController.post('/create',async (req,res)=>{
    const deviceData = req.body
    const userId = req.user.id

    try {
        await deviceService.create(deviceData, userId)
        
        res.redirect('/devices')
    } catch (err) {
        res.render('devices/create', {error: getErrorMessage(err), device: deviceData})
    }
})

deviceController.get('/:deviceId/details', async (req,res)=>{
    const deviceId = req.params.deviceId

    const device = await deviceService.getOne(deviceId)

    const isOwner = req.user && req.user.id === device.owner.toString()
    const isPreferred = device.preferredList.includes(req.user?.id)

    res.render('devices/details', {device, isOwner, isPreferred})
})

deviceController.get('/:deviceId/prefer', isAuth, async (req,res)=>{
    const deviceId = req.params.deviceId
    const userId = req.user.id

    try {
        await deviceService.prefer(deviceId,userId)

    } catch (err) {
        res.setError(getErrorMessage(err))

    }
    
    res.redirect(`/devices/${deviceId}/details`)
})

deviceController.get('/:deviceId/delete', async (req,res)=>{
    const deviceId = req.params.deviceId

    try {
        await deviceService.remove(deviceId, req.user.id)
        
        res.redirect('/devices')
    } catch (err) {
        res.setError(getErrorMessage(err))
        res.redirect(`/devices/${deviceId}/details`)
    }
})

deviceController.get('/:deviceId/edit', isAuth,async (req,res)=>{
    const deviceId = req.params.deviceId
    const device = await deviceService.getOne(deviceId)

    const ownerId = device.owner.toString()
    const userId = req.user.id

    if (ownerId !== userId) {
        res.setError('You are not the owner of this offer!')
        return res.redirect(`/devices/${deviceId}/details`)
    }

    res.render('devices/edit', {device})
})

deviceController.post('/:deviceId/edit', isAuth, async(req,res)=>{
    const deviceId = req.params.deviceId
    const userId = req.user.id
    const deviceData = req.body

    try {
        await deviceService.update(deviceId,userId,deviceData)
        
        return res.redirect(`/devices/${deviceId}/details`)
    } catch (err) {
        res.render('devices/edit', {device: deviceData, error: getErrorMessage(err)})
    }
})

export default deviceController