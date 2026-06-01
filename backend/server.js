import mongoose from "mongoose";
import app from "./src/app.js";


mongoose.connect(
process.env.MONGO_URL
);

app.listen(3000,()=>{

    console.log(
        "Servidor corriendo"
    );

});