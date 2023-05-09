import productModel from "../models/product.model.js"
import {HttpException} from '../exceptions/exceptions.js';
import lodash from 'lodash';
const { toNumber } = lodash


export async function save(productData){
    const product = await productModel.create({...productData})
    console.log(product)
    return {product}
}

export async function getAll(page,limit,query){

    const product = await productModel.find({
      $or:[
         {title : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
         {brand : { $regex: query?.search ? query?.search : '', $options: 'i' }},
         {district : { $regex: query?.search ? query?.search : '', $options: 'i' }},
         {city : { $regex: query?.search ? query?.search : '', $options: 'i' }},
         {type : { $regex: query?.search ? query?.search : '', $options: 'i' }}
       ]
    }   
    )
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit))
    .populate("userId",["name","email","mobileNo"])
    .populate("categoryId","categoryName")
    .populate("subcategoryId","subcategoryName")
    .sort({createdAt:-1})

    const total = await productModel.find().countDocuments()
    console.log(product)
    return{product,total}
 }
 

 export async function getProductByToken(id){
    const product = await productModel.find({userId:id})
    .populate("userId",["name","email","mobileNo"])
    .populate("categoryId","categoryName")
    .populate("subcategoryId","subcategoryName")
    if(!product) throw new HttpException(404, "product not found")
    console.log(product)
    return{product}
 }


 export async function getSingle(id){
   const product = await productModel.findById(id)
   .populate("userId",["name","email","mobileNo"])
   .populate("categoryId","categoryName")
   .populate("subcategoryId","subcategoryName")
   if(!product) throw new HttpException(404, "product not found")
   console.log(product)
   return{product}
}


 export async function Delete(id){
    const product = await productModel.findByIdAndDelete(id)
    if(!product) throw new HttpException(404, "product not found")
    return{product}
 }

 export async function deleteUserProduct(id){
   const products = await productModel.find({ userId: id });
   console.log("product:", products);
 
   if (products) {
      products.forEach(async (product) => {
         await productModel.findByIdAndDelete(product._id);
         console.log("Deleted product:", product);
       });
     
       return { message: "Product deleted successfully" };
   }
   return { message: "No Product" };

}

 export async function deleteProductByToken(userId,productId){
    const productData = await productModel.findById(userId) 
    if(!productData) throw new HttpException(404, "User not have any product yet")
    // const productId = productData._id
    const product = await productModel.findByIdAndDelete(productId)
    return{product}
 }


 export async function updateProductByToken(userId,data,productId){
    const productData = await productModel.findOne({userId:userId}) 
    if(!productData) throw new HttpException(404, "User not have any product yet")
    // const productId = productData._id
    const product = await productModel.findByIdAndUpdate(productId,data,{new:true})
    return{product}
 }


 export async function updatePhotoByToken(userId,data,productId){
   const productData = await productModel.findOne({userId:userId}) 
   if(!productData) throw new HttpException(404, "User not have any product yet")
   // const productId = productData._id
   const product = await productModel.findByIdAndUpdate(productId,data,{new:true})
   return{product}
}



export async function getPhotoById(id){
   const product = await productModel.findOne({_id:id})
   if(!product) throw new HttpException(404, "product not found")
   const photos = product.photos
   return{photos}
}