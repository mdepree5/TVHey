import { useEffect, useState, useRef } from 'react';
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

  const websocket = useRef(null);

  useEffect(() => {
    if (!sessionUser) return;

    const socket = io()
    
    console.log(`%c socket:`, `color:yellow`, socket)

    websocket.current = socket;

    socket.on('connect', () => {
      (async () => {
        await dispatch(setSocket(socket))
        console.log(`%c socket connected`, `color:lime`)
      })()
    })
    
    socket.on('disconnect', () => socket.connect())
    // return () => {
    //   if(websocket.current !== null) websocket.current.disconnect();
    //   console.log(`%c socket disconnected`, `color:red`)
    // }
  }, [dispatch, sessionUser])


  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;