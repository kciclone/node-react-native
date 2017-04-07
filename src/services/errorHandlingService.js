import uuid from 'uuid';

export function logException(err) {
    let errorId = uuid.v4();
    console.error(errorId, err);
    return errorId;
}

export function ApiError(code, message, details = '') {
    this.name = 'ApiError';
    this.code = code;
    this.message = message;
    this.details = details !== '' ? details : message;
}

