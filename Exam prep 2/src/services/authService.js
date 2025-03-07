import bcrypt from "bcrypt"

import User from "../models/user.js";
import { generateToken } from "../utils/authUtils.js";


export const register = async (userData)=>{                        // todo change required for register
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Password missmatch!')
    }

    const user=await User.findOne({email: userData.email}).select({_id: true})
    if (user) {
        throw new Error('User already exists!')
    }

    const createdUser =await User.create(userData)

    const token = generateToken(createdUser)

    return token
}

export const login = async (email,password) => {                    // todo change required for login if needed
    const user=await User.findOne({email})
    if (!user) {
        throw new Error('Invalid user or email!')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid user or email!')
    }
    
    const token = generateToken(user)

    return token
}

const authService = {
    register,
    login
}
export default authService