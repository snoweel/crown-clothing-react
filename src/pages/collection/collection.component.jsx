import React from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";
import './collection.styles.scss'


const CollectionPage = ({match}) => {
    // console.log('TYest');
    console.log(match.params.collectionId);
    return (
        <div className='category'>
            <h2> COllection page</h2>
        </div>
    )
}


export default CollectionPage;
