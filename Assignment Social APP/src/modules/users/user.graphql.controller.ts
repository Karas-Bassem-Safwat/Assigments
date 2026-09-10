import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  ThunkObjMap,
} from "graphql";
import { userType } from "../graphql/graphql.types";
import userGraphqlServices from "./user.graphql.service";
import { graohqlValidation } from "../../middleware/validation.middleware";
import {
  graphqlSchemaValidation,
  graphqlSchemaValidationData,
} from "./userValidation";
import { verifyToken } from "../../utils/security/token";

export const userQuery: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  getUsers: {
    type: new GraphQLList(userType),
    resolve: userGraphqlServices.getUsers,
  },
  sayHello: {
    type: new GraphQLObjectType({
      name: "sayHello",
      fields: {
        userName: { type: GraphQLString },
        useAge: { type: GraphQLInt },
      },
    }),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLInt },
    },
    resolve: async (_, args: graphqlSchemaValidationData) => {
      const name = args.name;
      await graphqlSchemaValidation(graphqlSchemaValidation.args);

      const { user } = verifyToken({ authorization: ctx.authoraization });
      return {
        userName: name,
        useAge: args.age,
      };
    },
  },
};
