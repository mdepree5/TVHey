// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'channelSocket/create';
const GET_ALL = 'channelSocket/get_all';
const GET_ONE = 'channelSocket/get_one';
const UPDATE = 'channelSocket/update';
const DELETE = 'channelSocket/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const create = channel => ({ type: CREATE, channel });
export const getAll = channels => ({ type: GET_ALL, channels });
export const getOne = channel => ({ type: GET_ONE, channel });
export const update = channel => ({ type: UPDATE, channel });
export const destroy = channelId => ({ type: DELETE, channelId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const channelReducer = (state = {selected:null, channels:{}}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState.channels[action.channel.id] = action.channel;
      newState.selected = action.channel;
      // console.log('REDUX STATECREATE NEWSTATE', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {...state};
      action.channels.forEach(channel => newState.channels[channel.id] = channel);
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ONE: {
      const newState = {...state};
      newState.selected = action.channel;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = {...state};
      newState.channels[action.channel.id] = action.channel;
      newState.selected = action.channel;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = {...state};
      delete newState.channels[action.channelId];
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default channelReducer;
