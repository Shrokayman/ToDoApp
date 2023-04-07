import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../utils/errorResponse.js'


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
    },
    password: {
        type: String,
        required: [true, 'Please, enter your password'],
        minlength: 6,
    },
}, { timestamps: true });


// Encrypt password using bcryptjs
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    )
}

// Match user entered password to hashed password in database
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Check user credentials
UserSchema.statics.CheckUserCredentials = async function (
    email,
    password,
    next
) {
    let user = await User.aggregate([
        {
            $match: { email },
        },
        {
            $project: {
                _id: 1,
                name: "$name",
                password: "$password",
            },
        },
    ])
    if (user.length === 0) {
        return next(new ErrorResponse("Invalid credentials", 400))
    }
    if (!(await bcrypt.compare(password, user[0].password))) {
        return next(new ErrorResponse("Invalid credentials", 400))
    }
    user[0].token = jwt.sign(
        {
            id: user[0]._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    )
    delete user[0]['password']
    return user[0]
}


const User = mongoose.model('User', UserSchema)

export { User }
