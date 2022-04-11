import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
import {authenticate} from './store/session';
import {setSocket} from './store/socket';

// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);

  const sessionUser = useSelector(state => state?.session?.user);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setPageLoaded(true);
    })()
  }, [dispatch]);

  useEffect(() => {
    const socket = io()
    socket.on('connect', () => {
      (async () => {
        await dispatch(setSocket(socket))
        console.log(`%c connected:`, `color:lime`)
      })()
    })

    return (() => socket.disconnect())
  }, [dispatch, sessionUser])


  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;