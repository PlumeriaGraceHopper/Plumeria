import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AllFlowers from "./components/AllFlowers";
import SingleFlower from "./components/SingleFlower";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Confirm from "./components/OrderConfirmation";
import { GuestCart } from "./components/GuestCart";
import { me } from "./store";
import { fetchCart } from "./store/cart";
import { fetchFlowers } from "./store/allFlowers";

// COMPONENT

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getCart(window.localStorage.token);
    this.props.getFlowers()
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/flowers" component={AllFlowers} />
            <Route path="/flowers/:id" component={SingleFlower} />
            <Route path="/users/cart" component={Cart} />
            <Route path="/payment" component={Payment} />
            <Route path="/confirmation" component={Confirm} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/flowers" component={AllFlowers} />
            <Route path="/flowers/:id" component={SingleFlower} />
            <Route path="/cart" component={GuestCart} />
          </Switch>
        )}
      </div>
    );
  }
}

// CONTAINER

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    cart: state.cart,
    flowers: state.flowers
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me());
    },
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
    getCart: id => {
      dispatch(fetchCart(id));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
