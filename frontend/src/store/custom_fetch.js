export const api2 = (endpoint='', action, config = {method: 'GET'}) => async (dispatch) => {
  // const fetchMethod = (config.method === 'GET') ? fetch : csrfFetch
  
  await fetch(`http://localhost:3000/api/${endpoint}`, config)
  .then(async response => {
    if (response.ok) {
      const data = await response.json()
      await dispatch(action(data));
      console.log('API FETCH', data)
      return data;
    } // else if (response.status < 500 && data.errors) return data.errors; 
    return response;
    // return 'YOU SHOULD NOT SEE THIS'
    // return ['An error occurred. Please try again.']
    // return Promise.reject(data)
  })
}

const apiFetch = route => (endpoint='', action, config = {method: 'GET'}) => async (dispatch) => {
  // const fetchMethod = (config.method === 'GET') ? fetch : csrfFetch
  
  await fetch(`http://localhost:3000/api/${route}/${endpoint}`, config)
  .then(async response => {
    if (response.ok) {
      const data = await response.json()
      await dispatch(action(data));
      console.log('API FETCH', data)
      return data;
    } // else if (response.status < 500 && data.errors) return data.errors; 
    return response;
    // return 'YOU SHOULD NOT SEE THIS'
    // return ['An error occurred. Please try again.']
    // return Promise.reject(data)
  })
}


export default apiFetch;