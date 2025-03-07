import { Schema,model,Types } from "mongoose";

const disastersShema = new Schema({
    nameOfDisaster: {
        type: String,
        required: true,
        minLength: 2,
    },
    typeOfDisaster: {
        type: String,
        required: true,
    },
    yearOfEvent: {
        type: Number,
        required: true,
        min: 0,
        max: 2024,
    },
    location: {
        type: String,
        required: true,
        minLength: 3,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    interestedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: [{
        type: Types.ObjectId,
        ref: 'User'
    }],

}, {
    timestamps: true,
})

const Disaster = model('Disaster', disastersShema)

export default Disaster