import Device from "../models/Device.js"

export const getAll = () => Device.find({})

export const getOne = (deviceId) => Device.findById(deviceId)

export const getLatest = () => Device.find({}).sort({_id: 'desc'}).limit(3)
// export const getLatest = () => Device.find({}).sort({createdAt: 'desc'}).limit(3)
// export const getLatest = () => Device.find({},{}, {sort: {_id: -1}, limit: 3})

export const create = (deviceData, userId) => Device.create({...deviceData, owner: userId})

export const remove = async (deviceId,userId) =>{
    const device = await getOne(deviceId)
    const owner = device.owner.toString()

    if (userId !== owner) {
        throw new Error('Only the owner can delete this offer!')
    }

    return Device.findByIdAndDelete(deviceId)
}

export const update = async (deviceId,userId,deviceData) =>{
    const device = await getOne(deviceId)
    const owner = device.owner.toString()

    if (userId !== owner) {
        throw new Error('Only the owner can edit this offer!')
    }

    return Device.findByIdAndUpdate(deviceId,deviceData, {runValidators: true})
}

export const prefer = async (deviceId,userId) =>{
    const device = await Device.findById(deviceId)

    
    if (userId === device.owner.toString()) {
        throw new Error('Cannot prefer your own offer!')
    }

    if (device.preferredList.includes(userId)) {
        throw new Error('You have already preferred this offer!')
    }

    device.preferredList.push(userId)

    return device.save()
}


export const getAllByOwnerId = (filter = {}) =>{
    let query = Device.find({})
    
    if (filter.owner) {
        query=query.find({owner: filter.owner})
    }
    
    if (filter.preferredBy) {
        // query=query.find({preferredList: filter.preferredBy})
        query = query.in('preferredList', filter.preferredBy)
    }

    return query
} 

function searchBar(searchQuery = '') {
    const filter = {};
   
    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: 'i' };     //! Case insensitive
    }
   
    return Device.find(filter);
  }

function findAll(filter = {}) {                 //async?
    let result = Device.find({}).lean()         //await?

    for (const searchQuery in filter) {
        result = result.filter(el=>el[searchQuery].toLowerCase().includes(filter[searchQuery].toLowerCase()))       //! another case insensitive 
    }
    return result
}

const deviceService = {
    getAll,
    getOne,
    create,
    remove,
    update,
    getLatest,
    prefer,
    getAllByOwnerId,
    searchBar,
    findAll
}

export default deviceService