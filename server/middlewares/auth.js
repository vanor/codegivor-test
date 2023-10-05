import jwt from "jsonwebtoken";
import ValidationError from "../validation/ValidationError.js";

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
        next();

    }catch(error){
        next(new ValidationError(error.message, 403));
    }
};

export default auth;