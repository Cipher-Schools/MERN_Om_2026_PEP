import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.json({ message: 'Token not found' });
        return;
    }
    const token = authHeader.split(' ')[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);   // {id,role}
    req.user = decode;
    next();
}



export const authorizeAdmin = async(req, res, next) => {
    if(req.user.role !== 'admin') {
        res.status(403).json({ message: 'UNAUTHORIZED: Only admin is allowed' });
        return;
    }
    next();
}

export const authorizeUser = async(req, res, next) => {
    if(req.user.role !=== 'user') {
        res.status(403).json({ message: 'UNAUTHORIZED: Only users are allowed' });
        return;
    }
}