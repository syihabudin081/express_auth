const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Extract the token value without the "Bearer" keyword
        const tokenValue = token.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(tokenValue, 'your-secret-key');

        req.userId = decodedToken.userId;
        console.log(req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { authorizeToken };
