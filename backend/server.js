const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./Config/db')

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/user', require('./Routes/UserRoutes'));

app.use('/api/doba', require('./Routes/DobaRoutes'));


app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))
