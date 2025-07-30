const jwt = require('jsonwebtoken');

module.exports = (req, res, nxt) => {
    try {
        const token = req.cookies?.['x-auth-token'] || null;
        if (!token) {
            return res.status(400).json({ message: "Token Not Found !", verified: false });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(400).send({ message: "Invalid Token !", verified: false });
            req.userID = decoded.userID;
            nxt();
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server error !", error: err });
    }
}