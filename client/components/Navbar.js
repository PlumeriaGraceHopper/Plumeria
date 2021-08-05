import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <img src="https://see.fontimg.com/api/renderfont4/3zXEp/eyJyIjoiZnMiLCJoIjo5MCwidyI6MTI1MCwiZnMiOjcyLCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UGx1bWVyaWE/monabeliaclean-regular.png" />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/flowers">All Flowers</NavLink>
          {/* <NavLink to={`user/${userId}/cart`}>Cart</NavLink> */}
          {/* How to get the userId here?? */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to ="/">Home</NavLink>
          <NavLink to="/flowers">All Flowers</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          {/* <NavLink to="/cart">Cart</NavLink> */}
          {/* Need to built cart link for guest user - does not need userId in URL */}
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
