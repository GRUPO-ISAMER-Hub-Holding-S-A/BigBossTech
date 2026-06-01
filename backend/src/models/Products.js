import mongoose from "mongoose";

const ProductSchema =
new mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },

    descripcion:{
        type:String,
        required:true
    },

    precio:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        default:0
    },

    imagen:{
        type:String,
        required:true
    },

    categoria:{
        type:String,
        default:"iphone"
    },

    activo:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

export default mongoose.model(
    "Product",
    ProductSchema
);