const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getAuthenticatedUser} = require('./handlers/users');

const cors = require('cors');
app.use(cors());

// const { db } = require('./util/admin');

//Scream Routes:
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);


//User Routes:
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.https.onRequest(app);

