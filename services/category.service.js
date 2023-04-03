import categoryModel from '../models/category.model.js'
import {HttpException} from '../exceptions/exceptions.js';
import { deleteSubcategories } from './subcategory.service.js';

export async function save(data){
   const category = await categoryModel.create({...data})
   return{category}
}

export async function getAll(){
    const category = await categoryModel.find()
    return{category}
 }

 export async function update(id,data){
    const category = await categoryModel.findByIdAndUpdate(id,data,{new:true})
    if (!category) throw new HttpException(404, " category not found")
    return{category}
 }

 export async function saveSubcategories(categoryId, subCategoryData){
   let category = await categoryModel.findById(categoryId)
   console.log(category);
   if (!category) throw new HttpException(404, " category not found")

    category = new categoryModel ({
      subCategoryData
   })
   await category.save({ validateBeforeSave: false });
   return{category}
}

 export async function Delete(id){
    const category = await categoryModel.findByIdAndDelete(id)
    if (!category) throw new HttpException(404, "category not found")

    const subcategoryId = category.subcategory
    console.log(subcategoryId);

    await deleteSubcategories(subcategoryId)

    return{category}
 }


