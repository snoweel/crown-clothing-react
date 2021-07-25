import React from "react";
import {Route} from "react-router-dom";

import {firestore,convertCollectionsSnaphotToMap} from "../../firebase/firebase.utils";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

// import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCollections} from "../../redux/shop/shop.selector";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {Router} from "workbox-routing";
import {updateCollections} from "../../redux/shop/shop.actions";
// const  ShopPage = ({match}) => (
//     <div className='shop-page'>
//         {/*<Router>*/}
//         <Route exact path={`${match.path}`} component={CollectionsOverview} />
//         <Route  path={`${match.path}/:collectionId`} component={CollectionPage} />
//         {/*</Router>*/}
//     </div>
// );

const CollectionOveriewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends  React.Component{
    // simplified way
    state = {
        loading:true,
    }
    // commented older way
    // constructor() {
    //     super();
    //
    //     this.state ={
    //         loading:true,
    //     }
    // }
    unSubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} =this.props;
        const collectionRef = firestore.collection('collections');
        // promise pattern for
        // collectionRef.get().then(async snapshot => {})
        // obersverable pattern
        collectionRef.onSnapshot(async snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnaphotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading:false})
            // console.log({collectionsMap});
        })
    }

    render() {
        const  {match} = this.props;
        const  {loading} = this.state;
        return (
            <div className='shop-page'>
                {/*<Router>*/}
                {/*<Route exact path={`${match.path}`} component={CollectionsOverview} />*/}
                {/*<Route  path={`${match.path}/:collectionId`} component={CollectionPage} />*/}
                <Route exact path={`${match.path}`} render={(props)=> <CollectionOveriewWithSpinner isLoading={loading} {...props}/>} />
                <Route  path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
                {/*</Router>*/}
            </div>
        );
    }
}

// class  ShopPage extends  React.Component{
//     constructor(props) {
//         super(props);
//
//         this.state ={
//             collections :SHOP_DATA
//         }
//     }
//
//     render() {
//         const  {collections} = this.state;
//         return (<div className='shop-page'>
//             {
//                 collections.map(({id,...otherCollectionProps}) =>(
//                     <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
//                 ))
//             }
//         </div>)
//     }
// }
// const mapStateToProps =  createStructuredSelector({
//     collections: selectCollections
//     }
// )

const mapDispatchToProps =dispatch =>({
    updateCollections: collectionsMap =>dispatch(updateCollections(collectionsMap))
})

// export default connect(mapStateToProps)(ShopPage);
export default connect(null,mapDispatchToProps)(ShopPage);
