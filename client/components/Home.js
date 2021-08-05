import React from "react";

//This is what renders ONLY IF A USER IS LOGGED IN. (Controlled via the Routes.js page - Home links to login page if user is not logged in, and to this page if they are logged in.)

class Home extends React.Component {
  render() {
    return <div>
        <h1>Welcome to Plumeria!</h1>
    </div>;
  }
}

export default Home
