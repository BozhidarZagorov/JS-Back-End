import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is requred!']
    },
    username:{
        type: String,
        required: [true, 'Username is requred!']
    },
    password:{
        type: String,
        required: [true, 'Password is requred!']
    }
})

userSchema.pre('save',async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = model('User',userSchema)

export default User