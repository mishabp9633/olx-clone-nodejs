import express from "express";
import cors from "cors";
import 'dotenv/config';

import { initialize } from './database/connection.js';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import categoryRouter from './routes/category.route.js'
import subcategoryRouter from './routes/subcategory.route.js'
import productRouter from './routes/product.route.js'
import staticRouter from './routes/static.route.js'

// import swaggerRouter from './swagger.js';

import {errorHandling} from './middlewares/error.middleware.js'

  await initialize()

  const app = express()

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({limit:"50mb"}))
  app.use(express.urlencoded({limit:"50mb",extended:true}))

  app.use(
    userRouter,
    authRouter,
    categoryRouter,
    subcategoryRouter,
    productRouter,
    staticRouter
    )
  // app.use('/swagger', swaggerRouter); 
  app.use(errorHandling)

  const port = process.env.PORT || 5000 ;
  app.listen(port , ()=>{
   console.log(`server listening at http://localhost:${port}`);
  })
 
