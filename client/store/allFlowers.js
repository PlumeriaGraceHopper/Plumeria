import axios from 'axios'


const SET_FLOWERS= 'SET_FLOWERS'


// ---- Set
export const setFlowers = (flowers) => {
  return {
  type: SET_FLOWERS,
  flowers
  }
};



// ---- Set
export const fetchFlowers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/flowers')
      dispatch(setFlowers(data));
    } catch (err) {
      console.log(err)
    }
  }
};


export default function allFlowersReducer ( state = [], action )  {
  switch (action.type) {
    case SET_FLOWERS:
      return action.flowers
    default:
      return state
  }
};
