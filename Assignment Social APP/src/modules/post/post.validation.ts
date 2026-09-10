import z from "zod";
import { PostPrivacyEnum } from "./model/post.types";
import { isValidObjectId } from "mongoose";

export const postValidation = {
  body: z.strictObject({
    title: z.string(),
    content: z.string(),
    privacy: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  }),
};

export type createPostData = z.infer<typeof postValidation.body>;

export const getPostsByIdValidation = {
  params: z.strictObject({
    id: z.refine(
      (value) => {
        return isValidObjectId(value);
      },
      {
        error: "invalid id value",
      },
    ),
  }),
};
