// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Actions —
// todo ——————————————————————————————————————————————————————————————————————————————————
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               — Creators —
// todo ——————————————————————————————————————————————————————————————————————————————————
const setUser = (user) => ({ type: SET_USER, payload: user });
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
  const response = await fetch('/api/auth/login', {method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ email: 'alligator@lo.ki', password:'thetrueloki' })});
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ['An error occurred. Please try again.']
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
const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
