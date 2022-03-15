import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authenticate} from './store/session';
// todo ——————————————————————————————————————————————————————————————————————————————————

import Main from './components/2_Main';

// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  useEffect(() => { dispatch(authenticate()) }, [dispatch])

  console.log('APP.js session user', sessionUser);

  return (
    <Main authenticated={sessionUser}/>
  );
}

export default App;