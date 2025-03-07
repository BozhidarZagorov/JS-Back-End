import { Schema,model,Types } from "mongoose";

const deviceShema = new Schema({            // todo change name devices and requirements for the schema
    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    ingredients: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200
    },
    instructions: {
        type: String,
        required: true,
        minLength: 10,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    recommendedList: [{
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

const Device = model('Device', deviceShema)             // todo change name devices

export default Device                                   // todo change name devices