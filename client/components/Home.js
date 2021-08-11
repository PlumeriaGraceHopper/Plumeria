import React from "react";
import { connect } from "react-redux";

//This is what renders ONLY IF A USER IS LOGGED IN. (Controlled via the Routes.js page - Home links to login page if user is not logged in, and to this page if they are logged in.)

class Home extends React.Component {
  render() {
    const { email } = this.props.auth;
    var name = email.substring(0, email.lastIndexOf("@"));
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <div>
        <h1>Welcome to Plumeria, {name} !</h1>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState, null)(Home);
