import axios from "axios";

const SET_SINGLE_FLOWER = "SET_SINGLE_FLOWER";

export const setSingleFlower = flower => {
  return {
    type: SET_SINGLE_FLOWER,
    flower,
  };
};

export const fetchSingleFlower = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/flowers/${id}`);
      dispatch(setSingleFlower(data));
    } catch (err) {
      console.log("error in fetchSingleFlower thunk:", err);
    }
  };
};

export default function singleFlowerReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_FLOWER:
      return action.flower;
    default:
      return state;
  }
}
