import mongoose from 'mongoose'
const Task = new mongoose.Schema({
    owner: {
        // type: mongoose.Schema.Types.ObjectId,

        // ref: 'user',
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    }
})

export default mongoose.model('Task', Task);
