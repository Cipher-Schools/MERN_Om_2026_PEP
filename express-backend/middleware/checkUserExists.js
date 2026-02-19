// const users = require('../index');

function checkUserExists(req, res, next) {
    const id = parseInt(req.params.id);

    const user = global.users.find(u => u.userId === id);
    
    if(!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    req.user = user;
    next();
}

module.exports = checkUserExists;