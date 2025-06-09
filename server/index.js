import express from 'express';
 import bodyparser from 'body-parser';
 import cors from 'cors';
 import mongoose from 'mongoose';
 import dotenv from 'dotenv';
 import helmet from 'helmet';
  import morgan from 'morgan';

  /* Import Routes */
   import authRoutes from "./routes/auth.js"
 import clientRoutes from "./routes/client.js"
 import generalRoutes from "./routes/general.js"
 import managementRoutes from "./routes/management.js"
 import salesRoutes from "./routes/sales.js"

 //data imports

import UserModel from "./models/User.js"
import ProductModel from "./models/Product.js"
import ProductStatModel from "./models/ProductStat.js"
import TransactionModel from './models/Transactions.js';
import OverallStatModel from './models/OverallStat.js';
import {dataUser,dataProduct,dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat} from "./data/index.js"
import AffliateStatModel from './models/AffliateStat.js';



  /* Backend Configuration */
  dotenv.config();
  const app  = express();
  app.use(express.json())
  app.use(helmet())
  app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
  app.use(morgan("common"));
  app.use(bodyparser.json())
  app.use(cors());

  /* ROUTES */
  app.use("/auth",authRoutes);
app.use("/client",clientRoutes);
app.use("/general",generalRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 7000;
mongoose.connect(process.env.MONGOOSE_URL)
.then(()=>{
 //UserModel.insertMany(dataUser);
  // ProductModel.insertMany(dataProduct);
  //  ProductStatModel.insertMany(dataProductStat);
  //TransactionModel.insertMany(dataTransaction);
 // OverallStatModel.insertMany(dataOverallStat)
 // AffliateStatModel.insertMany(dataAffiliateStat);
});

mongoose.connection.on("connected",()=>{
  console.log("MONgo DB start")
})
mongoose.connection.on("error",()=>{
  console.log("MONgo DB error")
})
/*Check if server started */
app.listen(3000,()=>{
  console.log(`server started on http://localhost/${PORT}`)
})