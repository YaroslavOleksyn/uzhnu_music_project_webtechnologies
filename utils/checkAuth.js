import jwt from 'jsonwebtoken';


export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'uzhnu2024');

            req.userId = decoded._id;
            next();
        }
        catch (err) {
            return res.status(403).json({
                message: "Нема доступу ",
            })
        }
    }
    else {
        return res.status(403).json({
            message: 'Нема доступу ',
        })
    }
} 