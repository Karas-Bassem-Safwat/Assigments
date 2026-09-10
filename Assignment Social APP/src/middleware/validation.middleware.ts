import { NextFunction, Request, Response } from "express";
import { GraphQLError } from "graphql";
import { SchemaType } from "mongoose";
import { ZodObject, ZodType } from "zod";

/** The schema object can validate any subset of body / params / query / headers */
export type SchemaMap = Partial<
  Record<"body" | "params" | "query" | "headers", ZodType>
>;

export type GraphQlValidationSchemaType = { args: ZodObject };
export const validation = (schema: SchemaMap) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationErrors: object[] = [];

    for (const key of Object.keys(schema) as Array<keyof SchemaMap>) {
      const result = await schema[key]!.safeParseAsync(
        req[key as keyof Request],
      );
      if (!result.success) {
        validationErrors.push(
          ...result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
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

export const graohqlValidation = async (
  schema: GraphQlValidationSchemaType,
  args: object,
) => {
  const validationResult = await schema.args.safeParseAsync(args);
  if (validationResult.success == false) {
    throw new GraphQLError("Validation error", {
      cause: validationResult.error,
    });
  }
};
