import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
     //Because the ContactData component will now get its data from the centralized Redux state,  not via react-router-dom, dont need render

        );
    }
}
const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}
//dont need mapDispatchToProps because we're not actually dispatching anything.. we do this through Route 
export default connect(mapStateToProps)(Checkout);
//if we had mapDispatchToProps only we need add null as first argument cause mapDispatchToProps need to be the second 
//e.g. export default connect(null,mapDispatchToProps)(Checkout);
