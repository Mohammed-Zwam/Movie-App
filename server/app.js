/*======== Demo Code For Testing :) ========*/
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT | 3000;
const mongoURL = process.env.DB_CONNECTION_STRING;
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/moviesRoutes');
var cors = require('cors')

// Middlewares
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



mongoose.connect(mongoURL).then(() => {
    console.log("Database Connected Successfully ...");
}).catch((err) => {
    console.error("❌ Database Connection Error:", err);
});


app.listen(PORT, () => {
    console.log("Server Running ...");
});
