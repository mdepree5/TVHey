import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
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

  // const webSocket = useRef(null);

  // useEffect(() => {
  //   if (!sessionUser) return;

  //   const ws = new WebSocket('ws://localhost:3000/');
  //   webSocket.current = ws;

  //   ws.onopen = e => console.log(`Connection open: ${e}`)

  //   console.log(`%c ws:`, `color:yellow`, ws)
  // }, [sessionUser])

  useEffect(() => {
    const socket = io(
      'ws://localhost:3000/',
      {transports: ["websocket", "polling"]}
    );
    const sockstate = dispatch(setSocket(socket));

    socket.on('connect', () => {
      const engine = socket.io.engine;
      console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name)

      engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(`%c engine.transport.name:`, `color:yellow`, engine.transport.name) // in most cases, prints "websocket"
      });
    })

    socket.on("connect_error", () => {
      // revert to classic upgrade
      socket.io.opts.transports = ["polling", "websocket"];
    });

    
    // console.log(`%c app socket:`, `color:yellow`, socket)
    console.log(`%c sockstate:`, `color:yellow`, sockstate)

    return (() => socket.disconnect())
  }, [dispatch])



  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;