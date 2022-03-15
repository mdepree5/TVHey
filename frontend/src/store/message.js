import apiFetch from './custom_fetch';
const api = apiFetch('messages')
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'messages/create';
const GET_ALL = 'messages/get_all';
const GET_ONE = 'messages/get_one';
const UPDATE = 'messages/update';
const DELETE = 'messages/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
const create = message => ({ type: CREATE, message });
const getAll = messages => ({ type: GET_ALL, messages });
const getOne = message => ({ type: GET_ONE, message });
const update = message => ({ type: UPDATE, message });
const destroy = messageId => ({ type: DELETE, messageId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Thunks —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createMessage = message => api('', create, {method: 'POST', body: JSON.stringify(message)});
export const getMessages = () => api('', getAll)
export const getMessage = messageId => api(messageId, getOne);
export const updateMessage = (message, messageId) => api(messageId, update, {method: 'PUT', body: JSON.stringify(message)});
export const deleteMessage = messageId => api(messageId, destroy, {method: 'DELETE'});
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE: {
      const newState = state; //* => persist state for error handling
      console.log('MESSAGE REDUX', newState)
      newState[action.message.id] = action.message;
      console.log('MESSAGE REDUX', newState)
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ALL: {
      const newState = {}; //* => reset state to populate fresh query
      action.messages['all_messages'].forEach(message => newState[message.id] = message);
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case GET_ONE: {
      const newState = state;
      newState[action.message.id] = action.message;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case UPDATE: {
      const newState = state;
      newState[action.message.id] = action.message;
      return newState;
    };
// ???? ——————————————————————————————————————————————————————————————————————————————————
    case DELETE: {
      const newState = state;
      delete newState[action.messageId.id];
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default messageReducer;
