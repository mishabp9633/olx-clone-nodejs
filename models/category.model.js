import mongoose,{Schema,model} from "mongoose";


export const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    enum:["Bike","Car","Other"]
    
  } 
},{timestamps:true})

const  category= model("Category", categorySchema)
export default category
