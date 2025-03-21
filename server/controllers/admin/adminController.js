import User from "../../models/userModel.js"


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