import React from "react";
import {Link} from "react-router-dom"
import './header.styles.scss';

//connect  HO function to modify component to have access to redux
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selector";

import  {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link to="/" className='logo-container'>
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link to="/shop" className='option'>
                SHOP
            </Link>
            <Link to="/contact" className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                    (<div className='option' onClick={()=>auth.signOut()}>
                    SIGN OUT</div>)
                    : (
                    <Link className='option' to="/signin" >
                        SIGN IN
                    </Link> )
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }

    </div>
)

// input  state=> rootReducer
const mapStateToProps = createStructuredSelector({
currentUser:selectCurrentUser,
    hidden:selectCartHidden
});

export default connect(mapStateToProps)(Header);
