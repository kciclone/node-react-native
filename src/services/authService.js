import passport from 'passport';
import jwt from 'jsonwebtoken';
import { getConfig } from '../config';

const config = getConfig();

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireLogin = passport.authenticate('local', { session: false });

export function generateToken(obj) {
    return jwt.sign(obj, config.auth.secret, {
        expiresIn: config.auth.expires // in seconds
    });
}

export function getUserInfo(user) {
    return {
        email: user.email
    }
}