/*======== Demo Code For Testing :) ========*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT | 3000;
const mongoURL = 'mongodb://localhost:27017/College';

mongoose.connect(mongoURL).then(() => {
    console.log("✅ Database Connected Successfully");
}).catch((err) => {
    console.error("❌ Database Connection Error:", err);
});


app.listen(PORT, () => {
    console.log("✅ Server Running ...");
});
