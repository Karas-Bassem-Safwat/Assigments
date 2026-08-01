"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeout = exports.badGetWay = exports.serverError = exports.Auth = exports.noContent = exports.badRequest = exports.created = exports.found = exports.notFound = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, options, statusCode) {
        super(message, options);
        this.statusCode = statusCode;
    }
}
class notFound extends AppError {
    constructor(message = "Not Found", options = {}) {
        super(message, options, 404);
    }
}
exports.notFound = notFound;
class found extends AppError {
    constructor(message = "Found", options = {}) {
        super(message, options, 200);
    }
}
exports.found = found;
class created extends AppError {
    constructor(message = "Created", options = {}) {
        super(message, options, 201);
    }
}
exports.created = created;
class badRequest extends AppError {
    constructor(message = "Bad Request", options = {}) {
        super(message, options, 400);
    }
}
exports.badRequest = badRequest;
class noContent extends AppError {
    constructor(message = "No Content", options = {}) {
        super(message, options, 401);
    }
}
exports.noContent = noContent;
class Auth extends AppError {
    constructor(message = "Authentication Required", options = {}) {
        super(message, options, 407);
    }
}
exports.Auth = Auth;
class serverError extends AppError {
    constructor(message = "Internal Server Error", options = {}) {
        super(message, options, 500);
    }
}
exports.serverError = serverError;
class badGetWay extends AppError {
    constructor(message = "Bad Gateway", options = {}) {
        super(message, options, 502);
    }
}
exports.badGetWay = badGetWay;
class Timeout extends AppError {
    constructor(message = "Gateway Timeout", options = {}) {
        super(message, options, 504);
    }
}
exports.Timeout = Timeout;
