import { Model, DataTypes } from "sequelize";
import {sequelize} from '../connection.js'

export class Posts extends Model{}

Posts.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    title:{
        type:DataTypes.TEXT
    },

    userId:{
        type:DataTypes.INTEGER,
    },

    createdAt:{
     type:DataTypes.DATE,
    },

    updatedAt:{
     type:DataTypes.DATE,
    }
},
{
    sequelize,
    modelName:"Posts",
    paranoid:true,
    deletedAt:"destroytime"
}
)