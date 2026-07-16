import { model, Schema, Types } from "mongoose";

const messageschema = new Schema({
  content: {
    type: String,
    min: 5,
    require: ()=>{
      return this.attachment?.length ? false : true
    },
  },
  attachment: {
    type: [String],
    min: 5,
    require: true,
  },
  sendTo: {
    type: Types.ObjectId,
    ref:"users",
    required:true
  }
},{
    timestamps:true,
    strictQuery:true,
    query:false,
});

export const message = model("Message",messageschema)