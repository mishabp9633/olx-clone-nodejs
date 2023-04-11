import { productImageCreate, productImageDelete, productImageUpdate } from "../services/productImage.service.js";



  export async function createProductImage (req, res, next){
    try {
      const productId = req.query.productId;
      const userId = req.query.userId;
      const files = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const createProductImageData =  await productImageCreate(productId, files, userId);

      res.status(200).json({ message: 'image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  export async function updateProductImage(req, res, next) {

    try {
      const productId = req.query.productId;
      const userId = req.query.userId;

      const files = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const updateProductImage = await productImageUpdate(productId, files, userId);

      res.status(200).json({ message: 'image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  export async function deleteProductImage(req , res , next){
    try {
      const productId = req.params.productId;
      const publicId = req.query.publicId

      const updatedProduct = await productImageDelete(productId, publicId);

      res.status(200).json({ message: 'image deleted successfully', product: updatedProduct });
    } catch (error) {
      next(error);
    }
  };

