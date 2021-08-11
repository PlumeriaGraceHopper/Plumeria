import axios from "axios";

//constant
const SET_SINGLE_FLOWER = "SET_SINGLE_FLOWER";

//action creator
export const setSingleFlower = flower => {
  return {
    type: SET_SINGLE_FLOWER,
    flower,
  };
};

//thunk
export const fetchSingleFlower = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/flowers/${id}`);
      dispatch(setSingleFlower(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default function singleFlowerReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_FLOWER:
      return action.flower;
    default:
      return state;
  }
}
