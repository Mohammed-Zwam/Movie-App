const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists !" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        user = new User(req.body);
        user.save().then(() => {
            res.json({ message: "User Saved Successfully ..." });
        }).catch((err) => {
            res.status(400).json({ message: "User Registration Failed !", error: err });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error !", error });
    }
};



const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Email OR Password !" });
        }
        const isEqual = await bcrypt.compare(req.body.password, user.password);

        if (!isEqual) {
            return res.status(400).json({ message: "Invalid Email OR Password !" });
        }
        const token = user.generateToken();
        res.cookie('x-auth-token', token, {
            httpOnly: true
        });
        res.json({ message: "Login Successful ..." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error !", error });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('x-auth-token', { httpOnly: true });
        res.json({ message: "Logout Successful ...", isLogOut: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error !", error });
    }
}


const verify = (req, res) => {
    try {
        const token = req.cookies?.['x-auth-token'] || null;

        if (!token) {
            return res.status(400).json({ message: "Token Not Found !", verified: false });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(400).send({ message: "Invalid Token !", verified: false });
            res.json({ verified: true });
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server error !", error: err });
    }
}

module.exports = {
    register,
    login,
    verify,
    logout
}