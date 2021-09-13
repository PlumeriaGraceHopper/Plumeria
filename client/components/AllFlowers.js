import React from "react";
import { connect } from "react-redux";
import { fetchFlowers } from "../store/allFlowers";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
});

export class AllFlowers extends React.Component {
  componentDidMount() {
    this.props.getFlowers();
  }

  render() {
    const { flowers } = this.props;
    return (
      <Box m={50}>
        <div className="flower">
          {flowers.map(flower => {
            return (
              // <div id="flowerAF" key={flower.id}>
              //   <Link to={`/flowers/${flower.id}`} className="flowerlink">
              //     <h2>{flower.name}</h2>
              //   </Link>
              //   <Link to={`/flowers/${flower.id}`}>
              //     <div>
              //       <img className="flowerImageMain" src={flower.image} />{" "}
              //     </div>
              //   </Link>
              //   <h3> ${flower.price / 100}</h3>
              // </div>
              <Box m={5}>
                <Card className={styles.title}>
                  <Button href={`/flowers/${flower.id}`}>{flower.name}</Button>
                  <Link to={`/flowers/${flower.id}`}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={flower.image}
                      title={flower.name}
                    />
                  </Link>
                  <Typography>
                  ${flower.price / 100}
                  </Typography>
                </Card>
              </Box>
            );
          })}
        </div>
      </Box>
    );
  }
}

const mapState = state => {
  return {
    flowers: state.flowers,
  };
};

const mapDispatch = dispatch => {
  return {
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
  };
};

export default connect(mapState, mapDispatch)(AllFlowers);
