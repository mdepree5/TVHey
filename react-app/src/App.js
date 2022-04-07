import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
import {authenticate} from './store/session';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { v4 as uuidv4 } from 'uuid';


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

    console.log(`%c process.env.REACT_APP_WS_URL:`, `color:yellow`, process.env.REACT_APP_WS_URL)

    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = e => {
      console.log(`%c connection open:`, `color:yellow`, e)
    }
    
    ws.onerror = e => console.error(`%c on error:`, `color:yellow`, e)
    
    ws.onclose = e => {
      console.log(`%c connection closed:`, `color:yellow`, e)
      websocket.current = null;
    }

    websocket.current = ws;

    return () => {
      if(websocket.current !== null) websocket.current.close();
    }

  }, [sessionUser])







  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;