import db from '../models';
import { saltHashPassword } from '../services/securityService';

let User = db.User;

export function getUserByEmail(email) {
    return User.findOne({
        where: {
            email: email
        }
    });
}

export function userExists(email) {
    return getUserByEmail(email).then(user => {
        return !!user;
    });
}

export function createUser(email, password) {
    let credentials = saltHashPassword(password);
    return User.create({
        email: email,
        salt: credentials.salt,
        hash: credentials.hash
    });
}