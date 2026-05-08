import { Model,DataTypes } from "sequelize";
import {sequelize} from '../connection.js'

export class Comments extends Model{}

Comments.init({ 
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    content:{
        type:DataTypes.TEXT
    },

    postId:{
        type:DataTypes.INTEGER
    },

    userId:{
        type:DataTypes.INTEGER
    },

   createdAt:{
        type:DataTypes.DATE,
    },

    updatedAt:{
        type:DataTypes.DATE,
    },
    
},{
    sequelize,
    modelName:"Comments"
}
)