import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is requred!'],
        minLength: 10,
    },
    username:{
        type: String,
        required: [true, 'Name is requred!'],
        minLength: 2,
        maxLength: 20,
    },
    password:{
        type: String,
        required: [true, 'Password is requred!'],
        minLength: 4,
    }
})

userSchema.pre('save',async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = model('User',userSchema)

export default User