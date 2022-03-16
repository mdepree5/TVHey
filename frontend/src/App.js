import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {authenticate} from './store/session';
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  useEffect(() => {dispatch(authenticate())}, [dispatch]);

  return <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;