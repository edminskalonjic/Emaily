import React from 'react';
import {connect} from 'react-redux';
import {handleToken} from '../actions';

import StripeCheckOut from 'react-stripe-checkout';


class Payments extends React.Component{
    render(){
        return(
            <StripeCheckOut
                name= "Emaily"
                description="$5 for 5 credit"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn">Add Credits</button>
            </StripeCheckOut>
                
        );
    }
}

export default connect(null, {handleToken})(Payments);