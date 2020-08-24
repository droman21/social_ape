
const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { getAllScreams } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');

const cors = require('cors');
app.use(cors());

// const { db } = require('./util/admin');


//Scream Routes:
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

//User Routes:
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.https.onRequest(app);

