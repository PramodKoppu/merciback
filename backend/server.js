const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
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

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true}));

app.use('/backend/avatar', express.static(path.join(__dirname, 'avatar')));

app.use('/api/user', require('./Routes/UserRoutes'));

app.use('/api/globalUser', require('./Routes/UserGlobalRoutes'));

app.use('/api/doba', require('./Routes/DobaRoutes'));

app.use('/api/cj', require('./Routes/CJRoutes'));

app.use('/api/ratings', require('./Routes/RatingsRoutes'));

app.use('/api/general', require('./Routes/EmartRoutes'));

app.use('/api/deodap', require('./Routes/DeodapRoutes'));

app.use('/api/order', require('./Routes/PaymentRoutes'));

app.use('/api/rooftop', require('./Routes/RooftopRoutes'));

app.use('/api/meesho', require('./Routes/MeeshooRoutes'));

app.use('/api/baap', require('./Routes/BaapRoutes'));

app.use('/api/avatar', require('./Routes/UploadImage'));

app.use('/api/percentage', require('./Routes/PercentageRoutes'));

app.use('/api/blood', require('./Routes/BloodContactsRoutes'));


app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))
