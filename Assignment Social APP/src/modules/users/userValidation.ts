import { isValidObjectId } from "mongoose";
import z from "zod";
import { friendRequestEnum } from "./types/friendRequest.types";
export const sendFriendRequestSchema = {
  body: z.strictObject({
    to: z.string().refine(
      (value) => {
        return isValidObjectId(value);
      },
      {
        error: "invalid id value",
      },
    ),
  }),
};

export type sendFriendRequestData = z.infer<
  typeof sendFriendRequestSchema.body
>;

export const friendRequestReplay = {
  body: z.strictObject({
    status: z.union([
      z.literal(friendRequestEnum.accepted),
      z.literal(friendRequestEnum.rejected),
    ]),
  }),

  params: z.strictObject({
    id: z.string().refine(
      (value) => {
        return isValidObjectId(value);
      },
      {
        error: "invalid id value",
      },
    ),
  }),
};

export type friendRequestReplayData = z.infer<typeof friendRequestReplay.body> &
  z.infer<typeof friendRequestReplay.params>;

export const cancelFriendRequest = {
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

export type cancelFriendRequestData = z.infer<
  typeof cancelFriendRequest.params
>;

export const graphqlSchemaValidation = {
  args: z.strictObject({
    name: z.string().nonempty,
    age: z.number().optional(),
  }),
};

export type graphqlSchemaValidationData = z.infer<
  typeof graphqlSchemaValidation.args
>;
