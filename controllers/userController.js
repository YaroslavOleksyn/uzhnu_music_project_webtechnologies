import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from '../models/user.js';
import user from "../models/user.js";


export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const doc = new UserModel({
            nickNam: req.body.nickNam,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl

        });

        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        },
            'uzhnu2024',
            {
                expiresIn: '30d'
            });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't create a register"
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                message: 'Невірний логін або пароль',
            });
        }


        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(401).json({
                message: 'Невірний логін або пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        },
            'uzhnu2024',
            {
                expiresIn: '30d'
            });


        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось авторизуватись",
        });
    }
};

export const profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Користувача незнайдено',
            })
        }
        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нема доступу',
        })

    }
}
export const update = async (req, res) => {
    try {
        const userId = await UserModel.findById(req.userId);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const updateData = {
            imageUrl: req.body.imageUrl !== undefined ? req.body.imageUrl : null,
            nickNam: req.body.nickNam !== undefined ? req.body.nickNam : null,
            email: req.body.email !== undefined ? req.body.email : null
        };

        const updateResult = await user.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!updateResult) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: updateResult,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update user",
        });
    }
};

export const updpref = async (req, res) => {
    try {
        const userId = await UserModel.findById(req.userId);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const reference = req.body.preference;
        userId.preference.push(reference);
        await userId.save();

        res.json({
            success: true,
            data: userId.preference,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update user",
        });
    }
};
