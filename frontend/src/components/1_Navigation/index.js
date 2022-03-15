import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './Navigation.css'

const Navigation = () => {
  const [navStatus, setNavStatus] = useState('nav-top');
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setNavStatus((window.scrollY > 0) ? 'nav-not-top' : 'nav-top')
    })
  }, [])

  // const sessionUser = useSelector(state => state.session.user);

  const NavBar = ({children}) => <nav className={`nav-bar ${navStatus}`}>{children}</nav>
  const LeftNav = ({children}) => <div id='left-nav'>{children}</div>
  const MidNav = ({children}) => <div id='mid-nav'>{children}</div>
  const RightNav = ({children}) => <div id='right-nav'>{children}</div>

  return (
    <NavBar>
    <LeftNav>
      <NavLink to='/'>Home</NavLink>
    </LeftNav>

    <MidNav>
      <NavLink to='/steps'>Steps</NavLink>
      {/* <div>- ----- -</div>
      <NavLink to='/route2'>Route 2</NavLink> */}
    </MidNav>

    <RightNav>
      {/* <NavLink to={`/users/${sessionUser.id}`}>My Page</NavLink> */}
      <div>My Page</div>
    </RightNav>
  </NavBar>
  )
}

export default Navigation;
