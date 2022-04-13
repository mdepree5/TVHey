// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const SET_USER = 'session/SET_USER';
const GET_USERS = 'session/GET_USERS';
const REMOVE_USER = 'session/REMOVE_USER';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
// const setUser = user => ({ type: SET_USER, payload: user });
const setUser = user => ({ type: SET_USER, user });
const getAll = users => ({ type: GET_USERS, users });
const removeUser = () => ({ type: REMOVE_USER })
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Thunks —
// todo ——————————————————————————————————————————————————————————————————————————————————
export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {headers: {'Content-Type': 'application/json'}});
  if (response.ok) {
    const data = await response.json();
    if (data.errors) return data.errors;
    dispatch(setUser(data));
  }
  return;
}

export const getUsers = () => async (dispatch) => {
  const response = await fetch('/api/users');
  if (response.ok){
    const data = await response.json();
    await dispatch(getAll(data))
    return data;
  }
  return response;
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ email, password })});
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ['An error occurred. Please try again.']
}

export const loginDemo = () => async (dispatch) => {
  

  // let count = 1;

  // const response1 = await fetch('/api/auth/signup', {method: 'POST', headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({username:`${count}alligator`, display_name:'', email:`${count}alligator@lo.ki`, password:'ImaVariant?1'})});


  const response = await fetch('/api/auth/login', {method: 'POST', headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ email: 'alligator@lo.ki', password:'Thetruel0ki??' })});
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ['An error occurred. Please try again.']
  
  // count++;
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {headers: {'Content-Type': 'application/json'}});
  if (response.ok) dispatch(removeUser());
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username, email, password})});
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ['An error occurred. Please try again.']
}

export const updateUserImage = (image_url, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/image`, { method: 'PUT', body: image_url });

  // console.log(`%c REDUX response:`, `color:yellow`, response)
  if (response.ok) {
    const updatedUser = await response.json();
    dispatch(setUser(updatedUser));

    return updatedUser;
  }
  return response;
};

export const updateUserDisplayName = (display_name, userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/display_name`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({display_name})});

  if (response.ok) {
    const updatedUser = await response.json();
    dispatch(setUser(updatedUser));

    return updatedUser;
  }
  return response;
};
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Reducer —
// todo ——————————————————————————————————————————————————————————————————————————————————
const initialState = { user: null, allUsers:{} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:{
      const newState = {...state};
      newState.user = action.user
      return newState;
      // return { user: action.payload }
    }
    case GET_USERS:{
      const newState = {...state};
      action.users['all_users'].forEach(user => newState.allUsers[user.id] = user);
      return newState;
      // return { user: action.payload }
    }
    case REMOVE_USER: {
      const newState = {...state}
      newState.user = null;
      return newState;
      // return { user: null }
    }
    default:
      return state;
  }
}
