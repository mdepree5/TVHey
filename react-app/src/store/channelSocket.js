// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'channelSocket/create';
const GET_ALL = 'channelSocket/get_all';
const SET_ONE = 'channelSocket/set_one';
const UPDATE = 'channelSocket/update';
const DELETE = 'channelSocket/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createChannel = channel => ({ type: CREATE, channel });
export const getChannels = channels => ({ type: GET_ALL, channels });
export const setChannel = channel => ({ type: SET_ONE, channel });
export const updateChannel = channel => ({ type: UPDATE, channel });
export const deleteChannel = channelId => ({ type: DELETE, channelId });
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
    case SET_ONE: {
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
