// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'messages-s/create';
const GET_ALL = 'messages-s/get_all';
const UPDATE = 'messages-s/update';
const DELETE = 'messages-s/delete';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const createMessage = message => ({ type: CREATE, message });
export const getMessages = messages => ({ type: GET_ALL, messages });
export const updateMessage = message => ({ type: UPDATE, message });
export const deleteMessage = messageId => ({ type: DELETE, messageId });
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const messageSReducer = (state = {messages:{}}, action) => {
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
      action.messages.forEach(message => newState.messages[message.id] = message);
      // console.log(`%c redux:`, `color:orange`, action)
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
      console.log('redux newstate before', newState)
      delete newState.messages[action.messageId];
      console.log('redux newstate after', newState)
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default messageSReducer;
