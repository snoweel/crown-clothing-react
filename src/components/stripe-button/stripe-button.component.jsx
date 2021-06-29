import React from "react";

import StripeCheckout from "react-stripe-checkout";

const  StripeCheckoutButton = ({price}) => {
    const  priceForStripe = price *100;
    const publishableKey ='pk_test_51J7ZAeDs9ZTY89ZWF5bDRhkPcPl7rd6hfTQYfZk7WjLbElcHbjXdeLjlUVRkpS4lR3pAKMHhRi3WJvIQBJ2fSsG500IdzAorjD';
    const onToken = token => {
        console.log({token});
        alert('Payment succesfull')
    };

    return (
        <StripeCheckout label='Pay Now' name='Crown CLothin' billingAddress shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da' description={` Your Total is  ${price}`}
                        amount={priceForStripe} panelLabel='Pay Now'
            token={onToken} stripeKey={publishableKey} />
    )
}


export default StripeCheckoutButton;
