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
export const createChannel = channel => ({ type: CREATE, channel });
export const getChannels = channels => ({ type: GET_ALL, channels });
export const getOneChannel = channel => ({ type: GET_ONE, channel });
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
      console.log(`%c redux`, `color:red`)
      console.log(`%c newState:`, `color:yellow`, newState)
      delete newState.channels[action.channelId];
      console.log(`%c newState:`, `color:green`, newState)
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default channelReducer;
