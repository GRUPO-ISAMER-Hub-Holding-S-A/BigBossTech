import express from "express";
import productRouter from "./routes/product.router.js";

const app = express();

app.use(express.json());

app.use(
    "/api/products",
    productRouter
);

export default app;