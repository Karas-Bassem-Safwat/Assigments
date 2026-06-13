import mongoose, { model, Schema, version, VirtualType } from "mongoose";

const notesSchema = new Schema (
{
        title:{
        type:String ,
        required: true,
            validator: function (value) {
          return value !== value.toUpperCase();
        },
        message:
          'Title must not be entirely uppercase. Use mixed case (example: "First Note" instead of "FIRST NOTE").',
    },
    
    content:{
        type:String ,
        required: true
    },
    
    createdAt:{
        type:timestamps ,
    },
    
    updatedAT:{
        type:timestamps ,
    },
    
    userID:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"userSchema",
        required:true
    }
},

{
    timestamps:true,
    versionKey:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}

)

export const notesSchema = model("notesSchema",notesSchema) 