const jwt = require('jsonwebtoken');
const users = require('../Models/userModel');

const roleBasedMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization'].split(" ")[1];
            if (token) {
                const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.payload = jwtResponse.userId;
                const userData = await users.findOne({ _id: req.payload });
                if (userData.role === requiredRole) {
                    next();
                } else {
                    res.status(403).json("Access denied!!");
                }
            } else {
                res.status(401).json("Please Provide token!!");
            }
        } catch (err) {
            res.status(403).json("Please Login");
        }
    };
};

module.exports = roleBasedMiddleware;
