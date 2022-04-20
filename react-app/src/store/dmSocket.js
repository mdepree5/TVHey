// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'dmSocket/create';
const GET_ALL = 'dmSocket/get_all';
const SET_ONE = 'dmSocket/set_one';
const UPDATE = 'dmSocket/update';
const DELETE = 'dmSocket/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createDm = dm => ({ type: CREATE, dm });
export const getDMs = dms => ({ type: GET_ALL, dms });
export const setDm = dm => ({ type: SET_ONE, dm });
export const updateDm = dm => ({ type: UPDATE, dm });
export const deleteDm = dmId => ({ type: DELETE, dmId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const dmReducer = (state = {selected:null, dms:{}}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState.dms[action.dm.id] = action.dm;
      newState.selected = action.dm;
      // console.log('REDUX STATECREATE NEWSTATE', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {...state};
      action.dms.forEach(dm => newState.dms[dm.id] = dm);
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case SET_ONE: {
      const newState = {...state};
      newState.selected = action.dm;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default dmReducer;



// !!!! ——————————————————————————————————————————————————————————————————————————————————
// !!!!                               Deprecated
// !!!! ——————————————————————————————————————————————————————————————————————————————————
// ???? ——————————————————————————————————————————————————————————————————————————————————
//     case UPDATE: {
//       const newState = {...state};
//       newState.dms[action.dm.id] = action.dm;
//       newState.selected = action.dm;
//       return newState;
//     };
// ???? ——————————————————————————————————————————————————————————————————————————————————
//     case DELETE: {
//       const newState = {...state};
//       delete newState.dms[action.dmId];
//       return newState;
//     }