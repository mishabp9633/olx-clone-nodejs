import _ from 'lodash';
import { HttpException } from '../exceptions/exceptions.js';
import cloudinary from '../utils/cloudinary.utils.js';
import productModel from "../models/product.model.js"
import userModel from "../models/user.model.js"

 

  export async function productImageCreate(productId, files) {
    const Product = await productModel.findById(productId);
    if(!Product) throw new HttpException(404, "product not found")
    const images = [];

    for (const file of files) {
      const public_id = `product/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    Product.images.push(...images);
    const productImage = await Product.save();
    return productImage;
  }

 export async function productImageUpdate (productId, files, userId){

  if (productId) {
    const Product = await productModel.findById(productId);
    if(!Product) throw new HttpException(404, "product not found")
    const images = [];

    for (const file of files) {
      const public_id = `product/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    Product.images.push(...images);
    const productImage = await Product.save();
    return productImage;
  }

  if(userId){
    const User = await userModel.findById(productId);
    if(!User) throw new HttpException(404, "User not found")
    const images = [];

    for (const file of files) {
      const public_id = `user/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    User.images.push(...images);
    const userProfile = await User.save();
    return userProfile;
  }


  }

  export async function getPhotoById(id) {
    const product = await productModel.findOne({ _id: id });
    console.log('prodct::', product);

    if (!product) throw new HttpException(404, 'product not found');
    const images = product.images;
    return { images };
  }

  export async function  productImageDelete(productId, publicId){
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    const imageIndex = product.images.findIndex(image => image.public_id === publicId);
    if (imageIndex === -1) {
      throw new Error('Image not found.');
    }
    product.images.splice(imageIndex, 1);
    await product.save();

    await cloudinary.uploader.destroy(publicId);

    return product;
}

