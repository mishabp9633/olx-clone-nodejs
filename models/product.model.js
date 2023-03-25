import mongoose,{Schema,model} from "mongoose";

const productDetailsSchema = new Schema({
    brand: {
      type: String,
    },
    type: {
      type: String,
    },
    noOfOwner: {
        type: String,
      },
      fuel: {
        type: String,
      },
      transmissionType: {
        type: String,
      },
    kmDriven: {
      type: Number,
    },
    year: {
      type: Number,
    }
  });


const productSchema = new Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
      },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: productDetailsSchema,
    // required: true
  },
  district: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  neighbourhood: {
    type: String,
    // required: true
  },
  // location: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  photos: [{
    type:String,
    publicId: String,
    url: String,
    // required: true,
  }],
  price: {
    type: Number,
    required: true
  },

}, { timestamps: true });

productSchema.index({ location: "2dsphere" });

const Product = model("Product", productSchema);

export default Product;


// import mongoose from "mongoose";

// export const productSchema = new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     subcategoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Subcategory',
//         required: true
//     },
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required:true
//     },
//     type: {
//         type: String,
//         enum: ['bicycle', 'motorcycle','spare parts','car'],
//         required: true
//     },
//     brand: {
//         type: String,
//         required: true,
//         enum: [
//             'Hercules', 'Hero', 'Royal enfield',
//             'Suzuki', 'Honda', 'Bajaj', 'Yamaha', 
//             'KTM', '',
//             'Other brand'
//     ]
//     },
//     kmDriven: {
//         type: Number,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type:Number,
//         required: true,
//     },
//     productPhotos:[{
//         type:String
//     }],
//     state:{
//         type:String,
//         required:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     neighbourhood:{
//         type:String,
//         required:true
//     },
//     location: {
//         type: {
//           type: String,
//           enum: ["Point"],
//           required: true,
//         },
//         coordinates: {
//           type: [Number],
//           required: true,
//         },
//     }

// }, { timestamps: true })

// productSchema.index({ location: "2dsphere" });

// const product = mongoose.model("Product", productSchema)
// export default product
