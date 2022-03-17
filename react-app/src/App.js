import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
// todo ——————————————————————————————————————————————————————————————————————————————————
import AuthForm from './components/0_Session/AuthForm';
// todo ——————————————————————————————————————————————————————————————————————————————————
import {UnAuthenticatedApp, AuthenticatedApp} from './components/2_Main';
import {authenticate} from './store/session';


// todo ——————————————————————————————————————————————————————————————————————————————————
// const App = () => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state?.session?.user);
//   useEffect(() => {dispatch(authenticate())}, [dispatch]);

//   return (
//   <>
//     <Switch>
//           <Route exact path="/login"><AuthForm /></Route>
//           <Route exact path="/sign-up"><AuthForm signup={true} /></Route>
//           <Route><Redirect to="/login" /></Route>
//     </Switch>
//     {sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}
  
//   </>
//   )
// }
// export default App;





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

  return pageLoaded && <>{sessionUser ? <AuthenticatedApp/> : <UnAuthenticatedApp/>}</>
}
export default App;