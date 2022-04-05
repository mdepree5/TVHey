import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { io } from 'socket.io-client';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
import {authenticate} from './store/session';
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
    const socket = io(
      'ws://localhost:3000/',
      {
        // {transports: ["websocket"]},
        // transports: ["websocket", "polling"],
        rememberUpgrade: true,
      },
    );

    console.log(`%c <App/> socket object:`, `color:orange`, socket)
    
    socket.on('connect', () => {
      console.log(`%c ———————————————————————————————————————————————————`, `color:lime`);
      console.log(`%c Connected`, `color:lime`);
      
      const engine = socket.io.engine;
      console.log(`%c engine object:`, `color:orange`, engine)
      console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name)
      
      engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name) // in most cases, prints "websocket"
      });
      console.log(`%c ———————————————————————————————————————————————————`, `color:lime`);
    })

    socket.on('disconnect', () => socket.connect());

    return (() => socket.disconnect())
  }, [dispatch, sessionUser])



  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;