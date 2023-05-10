import asyncHandler from 'express-async-handler';
import { Error } from 'mongoose';
import User from '../models/userModel.js';
import generatetoken from '../utils/generateToken.js';


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatetoken(user._id),
        });
    }
    else {
        res.status(401)
        throw new Error('Invalid Credentials');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name, email, password
    });

    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generatetoken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid data');
    }
});


const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found')
    }
});

export {
    authUser,
    registerUser,
    getUserProfile
}