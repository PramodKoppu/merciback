const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./Config/db')

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
// var cors = require('cors');
// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200,
// }
app.use(cors({origin: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/user', require('./Routes/UserRoutes'));

app.use('/api/doba', require('./Routes/DobaRoutes'));

app.use('/api/blood', require('./Routes/BloodContactsRoutes'));


app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))
