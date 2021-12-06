const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');

const servicePort = process.env.PORT || 5000;
const databasePort = process.env.MONGODB_URI || 'mongodb://localhost:27017/solvit'

const userController = require('./User/userController');

start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect(databasePort, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Database connected.');
            resolve();
        });
        db.on('error', (err) => reject(err));
    });

    const app = express();

    app.use(cors());
    app.use(auth())
    app.use(express.json());


    app.use('/', userController);

    app.get('/', (req, res) => {
        res.send('REST service is running.')
    })

    app.listen(servicePort, () => console.log(`Server listening on port ${servicePort}`));
}