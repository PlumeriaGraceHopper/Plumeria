import axios from "axios";

//constants
const SET_FLOWERS = "SET_FLOWERS";

// action creators
export const setFlowers = flowers => {
  return {
    type: SET_FLOWERS,
    flowers,
  };
};

// thunk creator
export const fetchFlowers = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/flowers");
      dispatch(setFlowers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function allFlowersReducer(state = [], action) {
  switch (action.type) {
    case SET_FLOWERS:
      return action.flowers;
    default:
      return state;
  }
}
