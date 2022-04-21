// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'dmSocket/create';
const GET_ALL = 'dmSocket/get_all';
const SET_ONE = 'dmSocket/set_one';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createDM = dm => ({ type: CREATE, dm });
export const getDMs = dms => ({ type: GET_ALL, dms });
export const setDM = dm => ({ type: SET_ONE, dm });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const dmReducer = (state = {selected:null, dms:{}, selectedUsersDMs:{}}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState.dms[action.dm.id] = action.dm;
      newState.selected = action.dm;
      
      newState.selectedUsersDMs[action.dm.recipient_id] = action.dm.id;
      /*
        * If we CREATE, we guarantee that the recipient_id belongs to NOT us.
        * Thus, we can safely add to selectedUsersDMs using recipient_id
      */

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
// const UPDATE = 'dmSocket/update';
// const DELETE = 'dmSocket/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// export const updateDm = dm => ({ type: UPDATE, dm });
// export const deleteDm = dmId => ({ type: DELETE, dmId });
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