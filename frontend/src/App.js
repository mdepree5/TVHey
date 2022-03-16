import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {authenticate} from './store/session';
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(authenticate())}, [dispatch]);
  // useEffect(() => {(async() => await dispatch(authenticate()))()}, [dispatch]);
  const sessionUser = useSelector(state => state?.session?.user);

  return <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;