import express from 'express';
const app = express();
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

import productRouter from './routes/productRoute.js';

connectDB();


app.get('/', (req, res) => {
    res.send('api is running...');
});

app.use('/api/products', productRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on  PORT ${PORT}`.yellow.bold);
});
