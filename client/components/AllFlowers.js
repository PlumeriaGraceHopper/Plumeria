import React from 'react';
import { connect } from 'react-redux';
import { fetchFlowers } from '../store/AllFlowers';
// import { Link } from 'react-router-dom';


export class AllFlowers extends React.Component {

//   constructor (props) {
//     super(props)
//     this.state = {
//         loading: true
//     }
//   }

  componentDidMount () {
      this.props.getFlowers();
    //   this.setState({
    //     //   loading: false
    //   })
  }

  render () {
      return (
          
        <div>
          <h1>All Flowers </h1>
            <div>
                { this.props.flowers.map(flower => {
                    return <h1 key = {flower.id} > {flower.name} </h1>
                }) }
                {console.log("THIS IS PROPS", this.props)}
                {console.log("THIS IS STATE", this.state)}
            </div>
        </div>
      )
  }
}

const mapState = (state) => {
    return {
      flowers: state.flowers
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getFlowers: () => {dispatch(fetchFlowers())}
    };
  };
  
  export default connect(mapState, mapDispatch)(AllFlowers);
  