const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();


const firebaseConfig = {
    apiKey: "AIzaSyD0XBN9fslCSB6CxJ1zjCFwggm5c0P9pMI",
    authDomain: "socialape-a01e4.firebaseapp.com",
    databaseURL: "https://socialape-a01e4.firebaseio.com",
    projectId: "socialape-a01e4",
    storageBucket: "socialape-a01e4.appspot.com",
    messagingSenderId: "482186640561",
    appId: "1:482186640561:web:2faf189242e458048d3690",
    measurementId: "G-RJ14TF4NJ7"
  };



const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);


app.get('/screams', (req, res) => {
    admin
        .firestore()
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    screamId: doc.id, 
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
        });
        return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin
        .firestore()
        .collection('screams')
        .add(newScream)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created successfully` });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong :(' });
            console.error(err);
        });
});

// Signup Route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };


//TODO Validate Data

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
            return res
            .status(201)
            .json({ message: `user ${data.user.uid} signed up successfully`});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code});
        });
});

exports.api = functions.https.onRequest(app);

