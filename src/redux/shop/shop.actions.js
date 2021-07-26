import ShopActionTypes from "./shop.types";
import {convertCollectionsSnaphotToMap, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,

})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap

})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage

})

export const fetchCollectionsStartAsync = () => {
    // console.log('inside fetchCollectionsStartAsync');
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        // promise pattern for
        collectionRef.get().then( snapshot => {
            const collectionsMap = convertCollectionsSnaphotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
            // this.setState({loading:false})
        }).catch(error => {
            dispatch(fetchCollectionsFailure(error.message));
        })
    }
}

