import React from "react";
import { connect } from "react-redux";
//Imported UI elements:
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { palette } from "@material-ui/system";


class Home extends React.Component {
  render() {
   
    return (
      <Box mt={50}>
      <img
        src="images/potential_new_plumeria_autumn.png"
        alt="logo"
        width="100%"
      />
    </Box>
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
