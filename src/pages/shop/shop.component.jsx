import React from "react";
// import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCollections} from "../../redux/shop/shop.selector";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
const  ShopPage = ({collections}) => (
    <div className='shop-page'>
        <CollectionsOverview/>

    </div>
);

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

// export default connect(mapStateToProps)(ShopPage);
export default ShopPage;
