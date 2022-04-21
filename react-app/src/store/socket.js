// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Action/Creator —
// todo ——————————————————————————————————————————————————————————————————————————————————
const SET = 'socket/set';
export const setSocket = socket => ({ type: SET, socket });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET: {
      const newState = {};
      newState.socket = action.socket;
      // console.log(`%c redux newState:`, `color:yellow`, newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default socketReducer;