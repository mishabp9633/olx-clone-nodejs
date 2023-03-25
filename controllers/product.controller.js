import {  Delete, deleteProductByToken,
     getAll, getPhotoById, getProductByToken,
      getSingle,
      save, updatePhotoByToken, updateProductByToken 
    } from "../services/product.service.js"
    
import cloudinary from '../utils/cloudinary.utils.js'


export async function getTestLog(req, res, next) {
  try {
    const user = req.body.user
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


export async function saveProduct(req, res, next) {
    try {
      const userId = req.body.user._id
      const productData = req.body
      console.log("productData",productData)
  
      const photos = []
  if (req.files) {
    for (const file of req.files) {
      const publicId = `product/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path ,{ public_id: publicId })
      photos.push({
        publicId: result.public_id,
        url: result.secure_url
      });
    }
  }

  
      productData.photos = photos;
  
      const product = await save({
        ...productData,
        userId: userId,
        location: {
          type: "Point",
          coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
          
        }
      });
  
      res.status(200).send(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  


export async function getAllProduct(req,res,next){
    try{
        const result = await getAll()
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}


export async function getSingleProduct(req,res,next){
  try{
      const result = await getSingle()
      console.log('result',result)
      res.status(200).send(result)
  }catch(err){
      console.log(err);
      next(err)
  }    
}



export async function getAllProductUserByToken(req,res,next){
    try{
        const userId = req.body.user._id
        const result = await getProductByToken(userId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}


export async function deleteProduct(req,res,next){
    try{
        const productId = req.params.id
        const {photos} = await getPhotoById(productId);
        console.log('photos:', photos);
  
        // Delete photos in cloudinary

        for (const photo of photos) {
          console.log(photo);
          await cloudinary.uploader.destroy(photo.publicId);
        }
        const result = await Delete(productId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}


export async function updateProductDataByToken(req,res,next){
    try{
        const userId = req.body.user._id
        const productId = req.params.id
        const productData = req.body
        console.log(productData);
        const result = await updateProductByToken(userId,productData,productId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}



export async function updateProductPhotoByToken(req, res, next) {
    try {
      const userId = req.body.user._id;
      const productId = req.params.id;
      const productData = req.body

      const {photos} = await getPhotoById(productId);
      console.log('photos:', photos);

      // Delete photos in cloudinary
      for (const photo of photos) {
        console.log(photo);
        await cloudinary.uploader.destroy(photo.publicId);
      }
  
      // Upload new photos and update 
      const newPhotos = [];
      for (const file of req.files) {
        const publicId = `product/${file.filename}`;
        const result = await cloudinary.uploader.upload(file.path,{ public_id: publicId });
        newPhotos.push({
          publicId: result.public_id,
          url: result.secure_url
        });
      }
      productData.photos = productData.photos ? [...productData.photos, ...newPhotos] : newPhotos;
  
      // Update the product in the database
      const result = await updatePhotoByToken(userId, productData, productId);
      console.log('result', result);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  



export async function deleteProductDataByToken(req,res,next){
    try{
        const userId = req.body.user._id
        const productId = req.params.id
        const {photos} = await getPhotoById(productId);
        console.log('photos:', photos);
  
        // Delete photos in cloudinary
        for (const photo of photos) {
          console.log(photo);
          await cloudinary.uploader.destroy(photo.publicId);
        }
        const result = await deleteProductByToken(userId,productId)
        console.log('result',result)
        res.status(200).send(result)
    }catch(err){
        console.log(err);
        next(err)
    }    
}



