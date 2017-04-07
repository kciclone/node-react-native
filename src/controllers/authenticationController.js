import express from 'express';
import { ApiError } from '../services/errorHandlingService';
import { userExists, createUser } from '../services/userService';
import { generateToken, requireLogin, getUserInfo } from '../services/authService';

const router = express.Router();

// Login
router.post('/api/auth/login', requireLogin, (req, res) => {
    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: req.user
    });
});


// Register
router.post('/api/auth/register', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    userExists(email).then(exists => {
        if (exists)
            next(new ApiError(409, `${email} already exists.`));
        else {
            createUser(email, password).then((user) => {
                let userInfo = getUserInfo(user);

                res.status(201).json({
                    token: `JWT ${generateToken(userInfo)}`,
                    user: userInfo
                });

            }).catch(err => next(new ApiError(500, `Couldn't create user ${email}.`, err)));
        }
    });
});

export default router;