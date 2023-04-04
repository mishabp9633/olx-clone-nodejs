import mongoose,{Schema,model} from "mongoose";


export const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    // enum:["Bike","Car","Other"]
  } ,
  // subcategory:[
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Subcategory"
  //   }
  // ],
},{timestamps:true})

const  categoryModel= model("Category", categorySchema)
export default categoryModel
