import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authenticate} from './store/session';
// todo ——————————————————————————————————————————————————————————————————————————————————
import Navigation from './components/1_Navigation';
import Main from './components/2_Main';
import Footer from './components/3_Footer';
// todo ——————————————————————————————————————————————————————————————————————————————————
const App = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  useEffect(() => { dispatch(authenticate()) }, [dispatch])

  console.log(sessionUser);

  return (
  <>
    <Navigation/>
    {/* <Main /> */}
    <Footer/>
  </>
  );
}

export default App;