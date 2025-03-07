import Disaster from "../models/Disasters.js"

export const getAll = () => Disaster.find({})

export const getOne = (disasterId) => Disaster.findById(disasterId)

// export const getLatest = () => Disaster.find({}).sort({_id: 'desc'}).limit(3)
// export const getLatest = () => Device.find({}).sort({createdAt: 'desc'}).limit(3)
// export const getLatest = () => Device.find({},{}, {sort: {_id: -1}, limit: 3})

export const create = (disasterData, userId) => Disaster.create({...disasterData, owner: userId})

export const remove = async (disasterId,userId) =>{
    const disaster = await getOne(disasterId)
    const owner = disaster.owner.toString()

    if (userId !== owner) {
        throw new Error('Only the owner can delete this offer!')
    }

    return Disaster.findByIdAndDelete(disasterId)
}

export const update = async (disasterId,userId,disasterData) =>{
    const disaster = await getOne(disasterId)
    const owner = disaster.owner.toString()

    if (userId !== owner) {
        throw new Error('Only the owner can edit this offer!')
    }

    return Disaster.findByIdAndUpdate(disasterId,disasterData, {runValidators: true})
}

export const prefer = async (disasterId,userId) =>{
    const disaster = await Disaster.findById(disasterId)

    
    if (userId === disaster.owner.toString()) {
        throw new Error('Cannot prefer your own offer!')
    }

    if (disaster.interestedList.includes(userId)) {
        throw new Error('You have already preferred this offer!')
    }

    disaster.interestedList.push(userId)

    return disaster.save()
}


export const getAllByOwnerId = (filter = {}) =>{
    let query = Disaster.find({})
    
    if (filter.owner) {
        query=query.find({owner: filter.owner})
    }
    
    if (filter.preferredBy) {
        // query=query.find({preferredList: filter.preferredBy})
        query = query.in('preferredList', filter.preferredBy)
    }

    return query
} 


const disasterService = {
    getAll,
    getOne,
    create,
    remove,
    update,
    prefer,
    getAllByOwnerId,
}

export default disasterService