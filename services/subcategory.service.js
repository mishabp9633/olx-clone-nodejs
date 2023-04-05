import {HttpException} from '../exceptions/exceptions.js';
import categoryModel from '../models/category.model.js';
import subcategoryModel from '../models/subcategory.model.js'
import { saveSubcategories } from './category.service.js';
import lodash from 'lodash';
const { toNumber } = lodash


export async function save(data){
   const subcategory = await subcategoryModel.create({...data})

   console.log(subcategory)

   let categoryId = subcategory.categoryId
   let subCategoryData = {
      subcategory : subcategory._id
   } 

   await saveSubcategories(categoryId, subCategoryData)
   return {subcategory}
}

export async function getAll(categoryId, page, limit){
   let queryData = {}

   if (categoryId){
      queryData["categoryId"]= categoryId
    }
    const subcategory = await subcategoryModel.find(queryData)
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    .populate('categoryId',"categoryName")
    const total = await subcategoryModel.find().countDocuments()

    return{subcategory, total}
 }

 export async function getAllQuery(categoryId){
   const subcategory = await subcategoryModel.find()
   .populate('categoryId',"categoryName")
   return{subcategory}
}

 export async function update(id,data){
    const subcategory = await subcategoryModel.findByIdAndUpdate(id,data,{new:true})
    if(!subcategory) throw new HttpException(404, "subcategory not found")
    return{subcategory}
 }

 export async function Delete(id){
    const subcategory = await subcategoryModel.findByIdAndDelete(id)
    if(!subcategory) throw new HttpException(404, "subcategory not found")
    return{subcategory}
 }

 export async function deleteSubcategories(id) {
   const subcategories = await subcategoryModel.find({ categoryId: id });
   console.log("Subcategories:", subcategories);
 
   if (subcategories){
      subcategories.forEach(async (subcategory) => {
         await subcategoryModel.findByIdAndDelete(subcategory._id);
         console.log("Deleted subcategory:", subcategory);
       });
     
       return { message: "Subcategories deleted successfully" };
   }
 
 return {message: "No subcategories"}
 }
 

 //....(motorcycle controller)....//
 export async function findCategoryId(id){
   const subcategory = await subcategoryModel.findById(id)
   if(!subcategory) throw new HttpException(404, "subcategory not found")
   const categoryId = subcategory.categoryId
   return{categoryId}
}