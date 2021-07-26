// import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectIsCollectionsFetching} from "../../redux/shop/shop.selector";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";


const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionsFetching,
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionOverviewContainer;
// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))