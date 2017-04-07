import { logException } from '../services/errorHandlingService';

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ApiError') {

        const errorId = logException(err.details);

        res.status(err.code).json({ id: errorId, message: err.message }).end();

    } else
        next(err);
};

export default errorHandler;