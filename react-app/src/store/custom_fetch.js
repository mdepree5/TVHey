
const apiFetch = route => (endpoint='', action, config = {method: 'GET'}) => async (dispatch) => {
  const base = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:3000/api';

  return await fetch(`${base}/${route}/${endpoint}`, config)
  .then(async response => {
    if (response.ok) {
      const data = await response.json()
      await dispatch(action(data));
      // console.log('API FETCH', data)
      return data;
    } // else if (response.status < 500 && data.errors) return data.errors; 
    return response;
  })
}

export default apiFetch;