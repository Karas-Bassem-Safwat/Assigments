"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => {
    return async (req, res, next) => {
        const validationErrors = [];
        for (const key of Object.keys(schema)) {
            const result = await schema[key].safeParseAsync(req[key]);
            if (!result.success) {
                validationErrors.push(...result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })));
            }
        }
        if (validationErrors.length) {
            res.status(422).json({
                success: false,
                statusCode: 422,
                message: "Validation Error",
                errors: validationErrors,
            });
            return;
        }
        next();
    };
};
exports.validation = validation;
