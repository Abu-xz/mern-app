import User from "../../models/userModel.js";
import jwt from 'jsonwebtoken'
import { errorHandler } from "../../utils/error.js";


export const updateProfile = async (req, res, next) => {
    console.log('update prfole reached')
    const { name, email, imageUrl } = req.body;

    const userId = req.user.id;
    console.log('user id from req.user', userId);

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, imageUrl }, { new: true });
        if (!updatedUser) {
            next(errorHandler(404, 'User not found!'))
        }
        res.status(200).json(updatedUser)

    } catch (error) {
        console.log('error while update profile', error.message)
        next(errorHandler(500, 'Error updating profile'))
    }

}
