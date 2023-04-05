import categoryModel from '../models/category.model.js'
import {HttpException} from '../exceptions/exceptions.js';
import lodash from 'lodash';
const { toNumber } = lodash


export async function save(data){
   const category = await categoryModel.create({...data})
   return{category}
}

export async function getAll(page, limit){
    const category = await categoryModel.find()
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    const total = await categoryModel.find().countDocuments()
    return{category,total }
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

    return{category}
 }


