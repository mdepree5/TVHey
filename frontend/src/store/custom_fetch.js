const apiFetch = route => (endpoint='', action, config = {method: 'GET'}) => async (dispatch) => {
  // const fetchMethod = (config.method === 'GET') ? fetch : csrfFetch
  
  await fetch(`http://localhost:3000/api/${route}/${endpoint}`, config)
  .then(async response => {
    const data = await response.json()
    if (response.ok) {
      dispatch(action(data));
      return data;
    } //*=> else if (response.status < 500 && data.errors) return data.errors; 
    // return response;
    // return ['An error occurred. Please try again.']
    return Promise.reject(data)
  })
}

export default apiFetch;

// export const apiFetch = (endpoint, config = {method: 'GET'}, action) => async (dispatch) => {
//   // const fetchMethod = (config.method === 'GET') ? fetch : csrfFetch
  
//   await fetch(`http://localhost:3000/api/${endpoint}`, config)
//   .then(async response => {
//     const data = await response.json()
//     if (response.ok) {
//       dispatch(action(data));
//       return data;
//     }
//     // return response;
//     return Promise.reject(data)
//   })
// }