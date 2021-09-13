import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//Imported UI elements:
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { palette } from "@material-ui/system";



class Home extends React.Component {

  chooseBackground (list) {
    let choice = Math.floor(Math.random() * list.length)
    return list[choice]
  }

  render() {
    return (
      <Box mt={50}>
       <Link to="/flowers"> <img
          src={this.chooseBackground([
            "images/potential_new_plumeria (1).png", 
            "images/potential_new_plumeria (2).png", 
            "images/potential_new_plumeria_autumn.png", 
            "images/potential_new_plumeria_petals.png", 
            "images/potential_new_plumeria_soft_blue.png", 
            "images/potential_new_plumeria_soft_sun.png", 
            "images/potential_new_plumeria_sunset.png", 
            "images/potential_new_plumeria.png",
            "images/plumera_banner.png",
            "images/plumera_banner (1).png",
            "images/plumera_banner (2).png",
            "images/plumera_banner (3).png",
            "images/plumera_banner (4).png",
          ]
          )}
          alt="banner"
          width="100%"
        />
        </Link>
        <Button href="/flowers">Click Here to Shop Our Flowers!</Button>
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
