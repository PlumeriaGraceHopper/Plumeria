import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";
import { me } from "../store";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import MuiAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import plumera_text_only_logo.png from '../images/plumera_text_only_logo.png'
const logo = require('../images/plumera_text_only_logo.png');


function AppBar(props) {
  return <MuiAppBar elevation={0} position="static" {...props} />;
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  toolbar: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    }
  },
});

class Navbar extends React.Component {
  render() {
    const { classes } = styles;
    console.log(styles)
    return (
      <div id="navbar">
       
        <nav>
          {this.props.isLoggedIn ? (
            // <div>
            //   {/* The navbar will show these links after you log in */}
            //   <NavLink to="/">Home</NavLink>
            //   <NavLink to="/flowers">All Flowers</NavLink>
            //   <NavLink to={"/users/cart"}>Cart</NavLink>
            //   <a href="#" onClick={this.props.handleClick}>
            //     Logout
            //   </a>
            // </div>
            <div>
            <AppBar position="fixed">
              <Toolbar className={styles.toolbar}>
                <div className={styles.left} />
            <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={styles.title}
            href="/"
          >
           {logo}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={styles.title}
            href="/flowers"
          >
            {'All Flowers'}
          </Link>
            <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={styles.title}
            href="/users/cart"
          >
            {'Cart'}
          </Link>
          <Button
            variant="h6"
            underline="none"
            color="inherit"
            className={styles.title}
            onClick={() => { this.props.handleClick() }}
          >
            {'Log Out'}
          </Button>
          </Toolbar>
          </AppBar>
          </div>
          ) : (

            <div>
            <AppBar position="fixed">
              <Toolbar className={styles.toolbar}>
                <div className={styles.left} />
                <Link
                  variant="h6"
                  underline="none"
                  color="inherit"
                  className={styles.title}
                  href="/"
                >
                  {'Home'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  color="inherit"
                  className={styles.title}
                  href="/flowers"
                >
                  {'All Flowers'}
                </Link>
                <div className={styles.right}>
                  <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    className={styles.rightLink}
                    href="/login"
                  >
                    {'Log In'}
                  </Link>
                  <Link
                    variant="h6"
                    underline="none"
                    className={clsx(styles.rightLink, styles.linkSecondary)}
                    href="/signup"
                  >
                    {'Sign Up'}
                  </Link>
                  <Link
                  variant="h6"
                  underline="none"
                  color="inherit"
                  className={styles.title}
                  href="/cart"
                >
                  {'Cart'}
                </Link>
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
