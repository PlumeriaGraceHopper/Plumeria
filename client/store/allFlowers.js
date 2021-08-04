import axios from 'axios'


const SET_FLOWERS= 'SET_FLOWERS'

// o: make sure to wipe out commented out code before finalizing

// const ADD_PROJECT = 'SET_PROJECT'
// const DELETE_PROJECT = 'DELETE_PROJECT'
// UPDATE & UNASSIGN - see singleProject reducer !!!


// ---- Set
export const setFlowers = (flowers) => {
  return {
  type: SET_FLOWERS,
  flowers
  }
};


// // ---- Add
// export const addProjectAction = (project) => {
//   return {
//     type: ADD_PROJECT,
//     project
//   }
// };

// // ---- Remove 
// export const deleteProjectAction = (project) => {
//   return {
//     type: DELETE_PROJECT,
//     project
//   }
// }



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

// // ---- Add
// export const addProject = (project) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.post('/api/projects', project);
//       dispatch(addProjectAction(data));
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// // ---- Remove
// export const deleteProject = (project) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.delete(`/api/projects/${project.id}`);
//       dispatch(deleteProjectAction(data));
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

export default function allFlowersReducer ( state = [], action )  {
  switch (action.type) {
    case SET_FLOWERS:
      return action.flowers
    default:
      return state
  }
};
