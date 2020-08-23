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

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
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

    db
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

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}


// Signup Route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = 'Must not be empty. Thx.'
    } else if (!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    if (isEmpty(newUser.password)) errors.password = 'Must not be empty. Thx.'
    if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Passwords must be the same.';
    if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty. Thx.'

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

//TODO Validate Data
    let token, userId;
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists){
                return res.status(400).json({ handle: 'this handle is already taken. sry.'});
            } else {
                return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use. Sry.'});
            } else {
                return res.status(500).json({ error: err.code});
            }
        });
});

exports.api = functions.https.onRequest(app);

