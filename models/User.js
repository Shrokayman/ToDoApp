import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please, enter your password'],
        minlength: 6,
    },
    phone: {
        type: String,
        minlength: [10, 'Please, enter a valid phone number'],
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


const User = mongoose.model('User', UserSchema)

export { User }
