import mongoose from 'mongoose'
const Task = new mongoose.Schema({
    owner: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'user',
        required: true
    },
    taskText: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model('task', Task);
