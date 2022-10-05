import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/types";

// define initial value
const INITIAL_STATE = [];

// 2. create Reducer
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      console.log(state);
      return state.filter(
        (val,index) => val.name !== action.payload
      );
      

    default:
      return state;
  }
}
export default userReducer;
