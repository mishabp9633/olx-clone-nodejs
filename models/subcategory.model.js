import mongoose,{Schema,model} from "mongoose"

const subcategorySchema = new Schema({

  categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
  subcategoryName: {
    type: String,
    required: true,
  } 

},{timestamps:true})

const  subcategory= model("Subcategory", subcategorySchema)
export default subcategory
