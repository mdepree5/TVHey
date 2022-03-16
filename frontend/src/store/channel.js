import apiFetch from './custom_fetch';
const api = apiFetch('channels')
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'channels/create';
const GET_ALL = 'channels/get_all';
const GET_ALL_MESSAGES = 'channels/get_all_messages';
const GET_ONE = 'channels/get_one';
const UPDATE = 'channels/update';
const DELETE = 'channels/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
const create = channel => ({ type: CREATE, channel });
const getAll = channels => ({ type: GET_ALL, channels });
const getAllMessages = channelId => ({ type: GET_ALL_MESSAGES, channelId });
const getOne = channel => ({ type: GET_ONE, channel });
const update = channel => ({ type: UPDATE, channel });
const destroy = channelId => ({ type: DELETE, channelId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Thunks —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createChannel = channel => api('', create, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(channel)});
export const getChannels = () => api('', getAll)
export const getMessages = channelId => api(`${channelId}/messages`, getAllMessages)
export const getChannel = channelId => api(channelId, getOne);
export const updateChannel = (channel, channelId) => api(channelId, update, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(channel)});
export const deleteChannel = channelId => api(channelId, destroy, {method: 'DELETE'});
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const channelReducer = (state = {selected:null, channels:{}, messages:{}}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState.channels[action.channel.id] = action.channel;
      newState.selected = action.channel;
      console.log('REDUX STATECREATE NEWSTATE', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {...state};
      // console.log('REDUX STATE', state)
      // console.log('REDUX SPREAD STATE', newState)
      // action.channels['all_channels'].forEach(channel => newState[channel.id] = channel);
      action.channels['all_channels'].forEach(channel => newState.channels[channel.id] = channel);
      // console.log('REDUX STATE WITH CHANNELS???', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ONE: {
      const newState = {...state};
      // console.log('GET ONE', newState)
      newState[action.channel.id] = action.channel;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = state;
      newState[action.channel.id] = action.channel;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = {...state};
      delete newState.channels[action.channelId.id];
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL_MESSAGES: {
      const newState = state;
      // const messages = newState.messages
      // console.log('CHANNEL STATE', messages)
      action.channelId['all_messages'].forEach(message => newState.messages[message.id] = message);
      // console.log('GET ALL MESSAGES', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default channelReducer;
