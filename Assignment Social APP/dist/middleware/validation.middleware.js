"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = async (schema) => {
    return async (req, res, next) => {
        const keys = Object.keys(schema);
        const validationError = [];
        for (const key of keys) {
            const validationResponse = await schema[key]?.safeParseAsync(req[key]);
            if (!validationResponse?.success) {
                validationError.push(validationResponse?.error.issues);
            }
        }
        if (validationError.length) {
            return res.json({ validationError });
        }
        else {
            return next();
        }
    };
};
exports.validation = validation;
