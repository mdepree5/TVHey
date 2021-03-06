import apiFetch from './custom_fetch';
const api = apiFetch('channels')
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'channels/create';
const GET_ALL = 'channels/get_all';
const GET_ONE = 'channels/get_one';
const UPDATE = 'channels/update';
const DELETE = 'channels/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
const create = channel => ({ type: CREATE, channel });
const getAll = channels => ({ type: GET_ALL, channels });
const getOne = channel => ({ type: GET_ONE, channel });
const update = channel => ({ type: UPDATE, channel });
const destroy = channelId => ({ type: DELETE, channelId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Thunks —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createChannel = channel => api('', create, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(channel)});
export const getChannels = () => api('', getAll)
export const getChannel = channelId => api(channelId, getOne);
export const updateChannel = (channel, channelId) => api(channelId, update, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(channel)});
export const deleteChannel = channelId => api(channelId, destroy, {method: 'DELETE'});
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
      action.channels['all_channels'].forEach(channel => newState.channels[channel.id] = channel);
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
      delete newState.channels[action.channelId.id];
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default channelReducer;
