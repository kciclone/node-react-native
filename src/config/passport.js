import passport from 'passport';
import jwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { getConfig } from '../config';
import { getUserByEmail } from '../services/userService';
import { isValidPassword } from '../services/securityService';

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const localOptions = { usernameField: 'email' };

// Local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    getUserByEmail(email).then(user => {
        if (user === null || !isValidPassword(password, user.hash, user.salt)) {
            return done(null, false, {error: 'Your login details could not be verified. Please try again.'})
        }

        return done(null, user);
    });
});

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: getConfig().auth.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    getUserByEmail(payload.email).then(user => {
        if (user === null) {
            return done(null, false)
        }

        return done(null, user);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);