import mongoose from 'mongoose'
const User= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        defalut: 'nonameUser'
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    }
})
export default mongoose.model('user', User)
