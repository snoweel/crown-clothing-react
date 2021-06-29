import firebase from "firebase/app";
import  'firebase/firestore'
import  'firebase/auth'



const  config ={
    apiKey: "AIzaSyDaYdKyQiz_GXCukITAqgmqs_7B1T4DaEE",
    authDomain: "crwn-db-4cf51.firebaseapp.com",
    projectId: "crwn-db-4cf51",
    storageBucket: "crwn-db-4cf51.appspot.com",
    messagingSenderId: "741574613222",
    appId: "1:741574613222:web:e631b173eef622f8e78327",
    measurementId: "G-7Q37E6Z4DJ"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth){
        return;
    }

    // documentRef has CRUD methods set,get,update and delete
    const userRef= firestore.doc(`users/${userAuth.uid}`);
    // snapShot represents data
    const snapShot = await userRef.get();
    // console.log(snapShot);
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
