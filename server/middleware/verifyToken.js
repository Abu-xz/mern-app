import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    console.log('verify token middleware reached')
    const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided!" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};
