import categoryModel from "../models/category.model.js"
import productModel from "../models/product.model.js"
import  subcategoryModel  from "../models/subcategory.model.js"
import  userModel  from "../models/user.model.js"


export async function counts(){

    const productCount = await productModel.find().countDocuments()
    const categoryCount = await categoryModel.find().countDocuments()
    const subCategoryCount = await subcategoryModel.find().countDocuments()
    const userCount = await userModel.find().countDocuments()
  
    return{productCount, categoryCount, subCategoryCount, userCount}
 }
 