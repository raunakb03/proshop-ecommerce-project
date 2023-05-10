import asyncHandler from 'express-async-handler';
import { Error } from 'mongoose';
import User from '../models/userModel.js';



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null,
        });
    }
    else {
        res.status(401)
        throw new Error('Invalid Credentials');
    }
})

export {
    authUser,
}