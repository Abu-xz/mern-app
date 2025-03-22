import User from "../../models/userModel.js"
import { errorHandler } from "../../utils/error.js"
import bcryptjs from 'bcryptjs'


export const fetchUsers = async (request, response) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }) // Only users will retrieved
        if (!users) {
            console.log('No users found!')
            return response.status(404).json({ success: true, message: 'No users found' })
        }

        response.status(200).json({ success: true, users });
    } catch (error) {
        console.log('user fetch error, ', error)
        response.status(500).json({ message: 'Server error' });
    }
}

export const updateUser = async (request, response, next) => {
    try {
        console.log('update user route reached')
        const { id } = request.params;
        const { userName, email, role } = request.body;

        const updatedUser = await User.findByIdAndUpdate(id, { userName, email, role }, { new: true });
        if (!updatedUser) {
            return response.status(404).json({ success: false, message: 'User not found!' })
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        next(errorHandler(500, 'Failed to updated user.'))
    }
}

export const deleteUser = async (request, response, next) => {
    try {
        const { id } = request.params;
        await User.findByIdAndDelete(id);
        response.status(200).json({ message: 'User deleted successfully' })

    } catch (error) {
        console.log(error);
        next(errorHandler(500, 'Failed to delete user'))
    }
}

export const createUser = async (req, res, next) => {
    try {
        console.log('create user route reached');
        const { userName, email, password, role } = req.body;

        if (!userName || !password || !email || !role) {
            console.log("Missing fields");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        console.log("Checking if user exists...");
        const userExist = await User.findOne({ email });

        if (userExist) {
            console.log("User already exists");
            return res.status(400).json({ success: false, message: "User already exists..." });
        }

        console.log("Hashing password...");
        const hashedPassword = bcryptjs.hashSync(password, 10);

        console.log("Creating new user...");
        const newUser = new User({ userName, email, password: hashedPassword, role });

        await newUser.save();
        console.log("User created successfully");

        return res.status(201).json({ success: true, message: "User created successfully" });


    } catch (error) {
        console.log(error);
        next(errorHandler(500, 'Error while creating user'))
    }
}

export const searchUser = async (req, res, next) => {
    console.log('user search route reached')
    console.log(req.params);

    const searchQuery = req.params.user;
    try {
        const users = await User.find({
            $or: [
                {
                    userName: { $regex: searchQuery, $options: 'i' }
                }, {
                    email: { $regex: searchQuery, $options: 'i' }
                }
            ]
        })

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found', users: [] })
        }

        res.status(200).json({ success: true, message: 'Found Searched User', users })
    } catch (error) {
        console.log('error while searching user');
        next(errorHandler(500, 'Error while Searching user'))
    }

}
