import React from "react";
import {Route} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionsFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selector";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import {firestore,convertCollectionsSnaphotToMap} from "../../firebase/firebase.utils";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

// import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import {connect} from "react-redux";
// import {createStructuredSelector} from "reselect";

import {selectCollections} from "../../redux/shop/shop.selector";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {Router} from "workbox-routing";
import {updateCollections} from "../../redux/shop/shop.actions";

import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
// const CollectionOveriewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);
import CollectionPageContainer from "../collection/collection.container";
class  ShopPage extends  React.Component{


    componentDidMount() {
        const {fetchCollectionsStartAsync} =this.props;
        // console.log('fetchCollectionsStartAsync ca;;')
        fetchCollectionsStartAsync();

    }

    render() {
        // const  {match,isCollectionFetching,isCollectionLoaded} = this.props;
        const  {match} = this.props;
        // const  {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                {/*<Route exact path={`${match.path}`} render={(props)=> <CollectionOveriewWithSpinner isLoading={isCollectionFetching} {...props}/>} />*/}
                {/*<Route  path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>} />*/}
                <Route  path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
                {/*</Router>*/}
            </div>
        );
    }
}



const mapStateToProps =createStructuredSelector(
    {
        // isCollectionFetching: selectIsCollectionsFetching,
        // isCollectionLoaded: selectIsCollectionsLoaded
    }
)
const mapDispatchToProps =dispatch =>({
    fetchCollectionsStartAsync: ()=>dispatch(fetchCollectionsStartAsync())
    // updateCollections: collectionsMap =>dispatch(updateCollections(collectionsMap))
})

// export default connect(mapStateToProps)(ShopPage);
export default connect(null,mapDispatchToProps)(ShopPage);
