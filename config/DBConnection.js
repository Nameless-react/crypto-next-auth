import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI_CRYPTO)
    .then(() => console.log("DataBase connected"))
    .catch(err => console.log(err))


export default mongoose

