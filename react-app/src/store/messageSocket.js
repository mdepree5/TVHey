// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const CREATE = 'messageSocket/create';
const GET_ALL = 'messageSocket/get_all';
const UPDATE = 'messageSocket/update';
const DELETE = 'messageSocket/delete';
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
      action.messages.forEach(message => newState.messages[JSON.parse(message).id] = JSON.parse(message));
      // action.messages.forEach(message => newState.messages[message.id] = message);
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
      // console.log(`%c before:`, `color:red`)
      // console.table(newState.messages)
      delete newState.messages[action.messageId];
      // console.log(`%c after:`, `color:lime`)
      // console.table(newState.messages)
      return newState;
    }
// ???? ——————————————————————————————————————————————————————————————————————————————————
    default:
      return state;
  }
};

export default messageSReducer;
