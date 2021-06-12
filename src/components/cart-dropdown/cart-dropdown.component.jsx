import React from "react";
import './cart-dropdown.styles.scss';

import {connect} from "react-redux";

import {createStructuredSelector} from "reselect";

import {withRouter} from "react-router-dom";


import CustomButton from "../custom-button/custom-button.comnponent";

import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.component";

const CartDropdown = ({cartItems,history,dispatch})=>(
    <div className='cart-dropdown'>
    <div className='cart-items' >
        {   cartItems.length?
            (
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>
                )
            )
           :
            ( <span className='empty-message'>Your Cart is empty</span>
            )
        }
    </div>

        <CustomButton onClick={()=>{
            dispatch(toggleCartHidden());
            history.push('/checkout');
        }}> Go To Checkout</CustomButton>
    </div>
)

const  mapStateToProps =createStructuredSelector({
    cartItems:selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));