import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    todo: {
        type: String
    }
}, { timestamps: true });


const Todo = mongoose.model('Todo', TodoSchema)

export { Todo }
