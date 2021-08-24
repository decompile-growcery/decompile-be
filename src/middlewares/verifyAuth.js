const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split(' ')[1];
        if (!token) {
            res.sendStatus(401)
        }
        
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            next();
        } catch (TokenExpiredError) {
            res.status(401).send({
                status: "Fail",
                message: "Token expired"
            });
        }
    } else {
        res.status(401).send({
            status: "Fail",
            message: "You don't have permission"
        });
    }
}

module.exports = {
    verifyToken
}