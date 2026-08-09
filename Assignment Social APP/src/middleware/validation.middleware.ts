import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

/** The schema object can validate any subset of body / params / query / headers */
export type SchemaMap = Partial<Record<"body" | "params" | "query" | "headers", ZodType>>;

/**
 * Validation middleware factory.
 *
 * Usage:
 *   router.post("/signup", validation(signUpSchema), handler)
 *
 * On failure → 422 with a structured errors array.
 * On success → calls next().
 */
export const validation = (schema: SchemaMap) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationErrors: object[] = [];

    for (const key of Object.keys(schema) as Array<keyof SchemaMap>) {
      const result = await schema[key]!.safeParseAsync(req[key as keyof Request]);
      if (!result.success) {
        validationErrors.push(
          ...result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          }))
        );
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
