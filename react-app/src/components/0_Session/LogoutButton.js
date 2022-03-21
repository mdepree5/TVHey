import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({socket}) => {
  const dispatch = useDispatch()
  console.log(`%c logout socket: ${socket}`, `color:yellow`);
  const onLogout = async (e) => {
    await socket.disconnect()
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
