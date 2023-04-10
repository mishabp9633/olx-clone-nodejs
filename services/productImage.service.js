import _ from 'lodash';
import { HttpException } from '../exceptions/exceptions.js';
import cloudinary from '../utils/cloudinary.utils.js';
import productModel from "../models/product.model.js"

 

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

 export async function productImageUpdate (productId, files){

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

    // const photos = Product.images

    // // Delete photos in cloudinary
    // for (const photo of photos) {
    //   console.log(photo);
    //   await cloudinary.uploader.destroy(photo.public_id);
    // }

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

