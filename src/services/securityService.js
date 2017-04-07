import crypto from 'crypto';

const getRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length);
};

export function sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
}

export function saltHashPassword(password) {
    let salt = getRandomString(65);
    let hash = sha512(password, salt);

    return {
        salt, hash
    }
}

export function isValidPassword(password, hash, salt) {
    let pwdHash = sha512(password, salt);
    return pwdHash === hash;
}