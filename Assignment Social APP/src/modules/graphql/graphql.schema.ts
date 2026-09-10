import { GraphQLBoolean, GraphQLObjectType, GraphQLSchema } from "graphql";
import { userType } from "./graphql.types";
import { userQuery } from "../users/user.graphql.controller";
import { chatQuery } from "../chat/chat.graphql.controller";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    fields: {
      ...userQuery,
      ...chatQuery,
    },
  }),
});
