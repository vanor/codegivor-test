import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import ValidationError from "../validation/ValidationError.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    let { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser)
            throw new ValidationError('user does not exists', 404);

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)
            throw new ValidationError('invalid credentials', 400);
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },  process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: existingUser, token });

    } catch (error) {
        next(error);
    }
};

export const signup = async (req, res, next) => {
    let { name, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser)
            throw new ValidationError('user with this email already exists', 400);

        if(!name || !email || !password || !confirmPassword)
            throw new ValidationError('name, email or password are missing', 400);

        if(password.length < 8)
            throw new ValidationError('password should have at least 8 characters', 400);

        if(password !== confirmPassword)
            throw new ValidationError("password don't match", 400);

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = await User.create({ email, password: hashedPassword, name });
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.status(201).json({ user: createdUser, token });

    } catch (error) {
        next(error);
    }
};
