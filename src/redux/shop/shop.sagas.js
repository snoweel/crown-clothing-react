import {takeEvery,call,put } from "redux-saga/effects";

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnaphotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsStart, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync(){

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnaphotToMap,snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionStart(){
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync);
}
