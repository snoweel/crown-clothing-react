import firebase from "firebase/app";
import  'firebase/firestore'
import  'firebase/auth'
// import {bindActionCreators} from "redux";



const  config ={
    apiKey: "AIzaSyCcSojLdKvNA2BCk0DeW5rC39y1bmcFTao",
    authDomain: "crw-db-fa8a4.firebaseapp.com",
    projectId: "crw-db-fa8a4",
    storageBucket: "crw-db-fa8a4.appspot.com",
    messagingSenderId: "440965018733",
    appId: "1:440965018733:web:3b6caca67ccbde0ab7fb64",
    measurementId: "G-9BZ6TJ9VB6"
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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log({collectionRef});

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log({newDocRef});
        batch.set(newDocRef,obj);
    });
   return await batch.commit();
}

export const convertCollectionsSnaphotToMap= (collections) => {
const transformedCOllections = collections.docs.map(
    doc => {
        const {title,items} = doc.data();
        return{
            route:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    }
)
    // console.log({transformedCOllections});
    return transformedCOllections.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    },{})

}
firebase.initializeApp(config);

export  const auth = firebase.auth();
export  const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export  const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
