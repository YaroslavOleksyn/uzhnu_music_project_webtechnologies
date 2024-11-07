import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { registerValidation, loginValidation } from './validation.js';
import checkAuth from './utils/checkAuth.js';
import { userController } from './controllers/index.js';
import handleValidErrors from './utils/handleValidErrors.js';


mongoose
    .connect('mongodb+srv://admin:admin@cluster0.lq05y.mongodb.net/user')
    .then(() => console.log('DB ok '))
    .catch((err) => console.log('DB error', err));


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage });
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.post('/login', loginValidation, handleValidErrors, userController.login)
app.post('/register',  handleValidErrors, userController.register)
app.get('/profile', checkAuth, userController.profile);
app.patch('/profile', checkAuth, userController.update);
app.post('/uploads', checkAuth, uploads.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.put('/preferences', checkAuth, userController.updpref);

app.listen(5555, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server ok')
});