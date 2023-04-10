import { productImageCreate, productImageDelete, productImageUpdate } from "../services/productImage.service";



  export async function createProductImage (req, res, next){
    try {
      const productId = req.params.id;
      const files = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const createProductImageData =  await productImageCreate(productId, files);

      res.status(200).json({ message: 'image uploaded successfully' });
    } catch (error) {
      next(error);
    }
  };

  export async function updateProductImage(req, res, next) {
    // try {
    //   const productId: string = req.params.id;
    //   const files: any = req.files;
      
    //   if (!files) {
    //     return res.status(400).json({ message: 'No files were uploaded.' });
    //   }
    //   const updateProductImageData: Product = await this.productImageService.updateProductImage(productId, files);

    //   res.status(200).json({message:"Updated product image"});
    // } catch (error) {
    //   next(error);
    // }

    try {
      const productId = req.params.id;
      const files = req.files;
      if (!files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
      const updateProductImage = await productImageUpdate(productId, files);

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

