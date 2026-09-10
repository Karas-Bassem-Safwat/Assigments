import { GraphQLObjectType, GraphQLString } from "graphql";

export const userType = new GraphQLObjectType({
  name: "user_type",
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLString },
  },
});

export const chatType = new GraphQLObjectType({
  name: "chat_type",
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLString },
  },
});
