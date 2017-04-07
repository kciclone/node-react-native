import apiRoot from './apiRoot';
import authenticationController from './authenticationController';
import userController from './userController';

const routes = (app) => {
    app.use(apiRoot);
    app.use(authenticationController);
    app.use(userController);
};

export default routes;