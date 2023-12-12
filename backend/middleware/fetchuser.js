var jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisismysecrethaha';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log("decoded data: ", data);
        req.user = data.id;
        // console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Please authenticate using a valid token", msg: error.message })
    }

}


module.exports = fetchuser;