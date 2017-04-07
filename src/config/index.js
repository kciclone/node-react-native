const config = {
    local: {
        host: 'http://localhost:3001',
        httpPort: 3001,
        responseLogLevel: 'OFF',
        db: {
            name: 'blacklist-db',
            username: 'blacklist-user',
            password: 'b14ckList#P@ssw0rd!'
        },
        path: {
            versionFile: __dirname + '/../version.json',
        },
        auth: {
            secret: 'bl@cklist-api',
            expires: 6000000,
            cookieSecret: 'very-secret-cookie-secret',
            cookieName: 'auth'
        }
    },

    development: {
        host: 'http://localhost:3000',
        httpPort: 3000,
        responseLogLevel: 'INFO',
        path: {
            versionFile: '/usr/src/app/version.json',
        },
        auth: {
            secret: 'bl@cklist-api',
            expires: 6000000,
            cookieSecret: 'very-secret-cookie-secret',
            cookieName: 'auth',
        }
    },

    test: {
        host: 'http://webservice-test:8000',
        httpPort: 8000,
        responseLogLevel: 'OFF',
        path: {
            versionFile: '/usr/src/app/src/version.json',
        },
        auth: {
            secret: 'bl@cklist-api',
            expires: 600000,
            cookieSecret: 'very-secret-cookie-secret',
            cookieName: 'auth',
        }
    }
};

export function getConfig() {
    return config[getEnvironment()];
}

export function getEnvironment() {
    return process.env.NODE_ENV || 'local';
}