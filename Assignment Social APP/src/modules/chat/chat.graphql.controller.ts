import { GraphQLList } from "graphql";
import { chatType, userType } from "../graphql/graphql.types";
import chatGraphqlService from "./chat.graphql.service";

export const chatQuery = {
  getChats: {
    type: new GraphQLList(chatType),
    resolve: chatGraphqlService.getChats,
  },
};
