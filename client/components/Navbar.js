import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";
import { me } from "../store";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import MuiAppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import plumera_text_only_logo.png from '../images/plumera_text_only_logo.png'
//const logo = require('../images/plumera_text_only_logo.png');

function AppBar(props) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    height: 64,
    [theme.breakpoints.up("sm")]: {
      height: 70,
    },
  },
});

const styles = theme => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,

  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

class Navbar extends React.Component {
  render() {
    const { classes } = styles;
    return (
      <div id="navbar">
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              <AppBar position="fixed">
                <Toolbar className={styles.toolbar}>
                  <div className={styles.left} />
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    href="/"
                  >
                     <img
                      src="images/plumera_text_only_logo.png"
                      alt="plumeria_logo"

                    />
                  </Button>
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    href="/flowers"
                  >
                    {"All Flowers"}
                  </Button>
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    onClick={() => {
                      this.props.handleClick();
                    }}
                  >
                    {"Log Out"}
                  </Button>
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    href="/users/cart"
                  >
                    <ShoppingCartIcon />
                  </Button>
                </Toolbar>
              </AppBar>
            </div>
          ) : (
            <div>
              <AppBar position="fixed">
                <Toolbar className={styles.toolbar}>
                  <div className={styles.left} />
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    href="/"
                  >
                    <img
                      src="images/plumera_text_only_logo.png"
                      alt="plumeria_logo"
                    />
                  </Button>
                  <Button
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={styles.title}
                    href="/flowers"
                  >
                    {"All Flowers"}
                  </Button>
                  <div className={styles.right}>
                    <Button
                      color="inherit"
                      variant="h6"
                      underline="none"
                      className={styles.rightLink}
                      href="/login"
                    >
                      {"Log In"}
                    </Button>
                    <Button
                      color="inherit"
                      variant="h6"
                      underline="none"
                      className={styles.rightLink}
                      href="/signup"
                    >
                      {"Sign Up"}
                    </Button>
                    <Button
                      variant="h6"
                      underline="none"
                      color="inherit"
                      className={styles.title}
                      href="/cart"
                    >
                      <ShoppingCartIcon />
                    </Button>
                  </div>
                </Toolbar>
              </AppBar>
              <div className={styles.placeholder} />
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
