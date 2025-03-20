import User from "../../models/userModel.js";
import jwt from 'jsonwebtoken'
// import { errorHandler } from "../../utils/error.js";

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        console.log('admin login data: ', req.body);

        const validAdmin = await User.findOne({ email }).lean();

        if (!validAdmin) {
            console.log('invalid admin credential');
            return res.status(403).json({ success: false, message: 'Invalid Credential.' });
        }

        if (validAdmin.password !== password) {
            console.log("Invalid Credential.");
            return res.status(403).json({ success: false, message: 'Invalid Credential.' });
        }

        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET_KEY);

        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200).json({ success: true, username: validAdmin.userName, role: validAdmin.role, message: 'Login Successfully.', })

    } catch (error) {
        console.log('Admin login error: ', error)
        next(error)
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true
    });
    res.status(200).json({ success: true, message: 'logout successfully' });
}