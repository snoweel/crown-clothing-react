import React from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";
import {connect} from "react-redux";

import {selectCollection} from "../../redux/shop/shop.selector";


import './collection.styles.scss'


const CollectionPage = ({collection}) => {
    // console.dir(collection);
    // console.log(match.params.collectionId);

    return (
        <div className='category'>
            <h2> COllection page</h2>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
