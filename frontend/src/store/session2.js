import {apiFetch} from './custom_fetch';
const api = apiFetch('auth')
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
export const authenticate = () => api('', setUser);
export const login = (email, password) => api('login', setUser, {method: 'POST', body: JSON.stringify({email, password})});
export const loginDemo = () => api('login', setUser, {method: 'POST', body: JSON.stringify({email: 'demo@aa.io', password: 'password'})});
export const logout = () => api('logout', removeUser);
export const signUp = (username, email, password) => api('signup', setUser, {method: 'POST', body: JSON.stringify({username, email, password})});
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
