import { Router } from "express";
import Product from "../models/Products.js";

const router = Router();

router.get("/", async(req,res)=>{

    const productos =
    await Product.find({
        activo:true
    });

    res.json(productos);

});

router.get("/:id", async(req,res)=>{

    const producto =
    await Product.findById(
        req.params.id
    );

    res.json(producto);

});

export default router;