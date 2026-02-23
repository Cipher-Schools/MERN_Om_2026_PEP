const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Token not found'});
        return;
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, 'S3cRet');

    req.userId = decoded.id;

    next();
}

module.exports = authenticate;