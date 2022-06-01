import mongoose from 'mongoose'
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    }
})
export default mongoose.model('user', User)
