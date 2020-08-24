const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

const cors = require('cors');
app.use(cors());

// const { db } = require('./util/admin');


// const {
//     // getAllScreams,
//     postOneScream,
//     getScream,
//     commentOnScream,
//     likeScream,
//     unlikeScream,
//     deleteScream
// } = require('./handlers/screams');
// const {
//     // signup,
//     // login,
//     uploadImage,
//     addUserDetails,
//     getAuthenticatedUser,
//     getUserDetails,
//     markNotificationsRead
// } = require('./handlers/users');


//Scream Routes:
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);


//User Routes:
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.https.onRequest(app);

