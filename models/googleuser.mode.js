import mongoose,{Schema,model} from "mongoose";

const googleUserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  picture: {
    type: String, 
  },
  role: {
    type:String,
    default:"seller"
  }
})

const googleUser = model("Googleuser", googleUserSchema);
export default googleUser;