import { request } from "express"
import User from "../../models/userModel.js"
import { errorHandler } from "../../utils/error.js"


export const fetchUsers = async (request, response) => {
    try {
        const users = await User.find({role: {$ne: 'admin'}}) // Only users will retrieved
        if(!users){
            console.log('No users found!')
            return response.status(404).json({success: true, message: 'No users found'})
        }

        response.status(200).json({success: true, users});
    } catch (error) {
        console.log('user fetch error, ', error)
        response.status(500).json({ message: 'Server error' });
    }
}

export const deleteUser = async (request, response, next) => {
    try {

        const {id} = request.params;
        console.log('User id: ',id)
        await User.findByIdAndDelete(id);
        response.status(200).json({message: 'User deleted successfully'})

    } catch (error) {
        console.log(error);
        next(errorHandler(500, 'Failed to delete user'))
    }
}

export const updateUser = async (request, response, next) => {
    try {
        const {id} = req.params;
        const {name, email, role} = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, {userName: name, email, role}, {new: true});
        if(!updatedUser){
            return response.status(404).json({success: false, message: 'User not found!'})
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        next(errorHandler(500, 'Failed to updated user.'))
    }
}