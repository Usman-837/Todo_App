import app from "./app.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

// mongoDB Connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('MongoDB Connect')
})
.catch((error) => {
    console.log('MongoDB Connection Error', error);
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

