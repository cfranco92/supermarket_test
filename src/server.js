// By Cristian
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const router = require('./network/routes');
const env = require('./env/environment');
const db = require('./mongo');

db(env.dbUrl);

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100'
];
// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(env.publicRoute, 'adminSocialMarket')));

router(app);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(env.angularIndex));
});
app.listen(env.port, () => console.log(`API running on ${env.host}:${env.port}`));