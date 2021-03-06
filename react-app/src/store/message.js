import apiFetch from './custom_fetch';
const api = apiFetch('messages')
const channelApi = apiFetch('channels')
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'messages/create';
const GET_ALL = 'messages/get_all';
const UPDATE = 'messages/update';
const DELETE = 'messages/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
const create = message => ({ type: CREATE, message });
const getAll = (messages, channelId) => ({ type: GET_ALL, messages, channelId });
const update = message => ({ type: UPDATE, message });
const destroy = messageId => ({ type: DELETE, messageId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Thunks —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createMessage = message => api('', create, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(message)});
export const getMessages = channelId => channelApi(`${channelId}/messages`, getAll)
export const updateMessage = (message, messageId) => api(messageId, update, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(message)});
export const deleteMessage = messageId => api(messageId, destroy, {method: 'DELETE'});
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const messageReducer = (state = {messages:{}}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = {...state};
      newState.messages[action.message.id] = action.message;
      // console.log('CREATE NEW STATE', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {messages:{}};
      action.messages['all_messages'].forEach(message => newState.messages[message.id] = message);
      // console.log('REDUX Get All', newState);
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = {...state};
      newState.messages[action.message.id] = action.message;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = {...state};
      delete newState.messages[action.messageId.id];
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default messageReducer;
