import express from 'express';
import errorHandler from 'errorhandler';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import responseLogger from './middleware/responseLogger';
import customErrorHandler from './middleware/errorHandler';

import { getConfig, getEnvironment } from './config';
import routes from './controllers';
import models from './models';

require('./config/passport'); // Setup passport strategies for authentication

const app = express();

const envConfig = getConfig();

// static content delivery for documentation
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());

app.use(responseLogger(envConfig.responseLogLevel));

if (getEnvironment() === 'local') {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(envConfig.auth.cookieSecret));

// initialize data storage
models.sequelize.sync().then(() => {
    console.log('Database initialized.');
}).catch(err => console.error('An Error occured while initializing the database.', err));

// Api routes
routes(app);

app.use(customErrorHandler);

// Render the index page for all routes - website is SPA, routing is made on the FE
app.get('*', (req, res) => {
    res.status(200).render('index', {title: 'Blacklist'});
});

export default app;