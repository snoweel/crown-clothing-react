import firebase from "firebase/app";
import  'firebase/firestore'
import  'firebase/auth'



const  config ={
    apiKey: "AIzaSyDHZqgM7yLhZDSLs5Ot6ASKxd_AkBfypXg",
    authDomain: "crwn-db-422af.firebaseapp.com",
    projectId: "crwn-db-422af",
    storageBucket: "crwn-db-422af.appspot.com",
    messagingSenderId: "67799809903",
    appId: "1:67799809903:web:959ea26f576342c91db29a",
    measurementId: "G-TB5FETYLES"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth){
        return;
    }

    // documentRef has CRUD methods set,get,update and delete
    const userRef= firestore.doc(`users/${userAuth.uid}`);
    // snapShot represents data
    const snapShot = await userRef.get();
    console.log(snapShot);
    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,email,createdAt,...additionalData
            })
        }catch (error){
            console.log('error creating user ',error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export  const auth = firebase.auth();
export  const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export  const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
