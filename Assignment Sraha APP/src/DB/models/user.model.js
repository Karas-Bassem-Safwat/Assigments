import { model, Schema, version, VirtualType } from "mongoose";

const userSchema = new Schema (
{
        firstName:{
        type:String ,
        required: true

    },
    
    lastName:{
       type:String ,
       required: true
    },
    
    email:{
        type:String ,
        required: true
    },
    
    password:{
        type:String ,       
        required: true

    },
    
    phone:{
        type:Boolean ,
        required: true
    },

    age:{
        type:Number ,
        required: true,
        min:18,
        max:60
    }
},

{
    timestamps:true,
    versionKey:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}

)

export const usershema = model("userSchema",userSchema) 