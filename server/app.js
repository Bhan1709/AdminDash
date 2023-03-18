import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import path from "path";
import { fileURLToPath } from "url";

/* Data Imports */
//import User from "./models/User.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from "./data/index.js";
/*import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";*/

/*Configuration*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*Routes*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/*Mongoose Setup*/
const port = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server running on Port: ${port}`));

    /* Only on First Run 
    User.insertMany(dataUser);
    Product.insertMany(dataProduct);
    ProductStat.insertMany(dataProductStat);
    Transaction.insertMany(dataTransaction);*/
  })
  .catch((err) => console.log(`${err} did not connect.`));
