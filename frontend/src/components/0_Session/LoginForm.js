import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import {FormInput, FormErrors} from '../Utils/forms';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
  };
  
  const sessionUser = useSelector(state => state?.session?.user);
  if (sessionUser) return <Redirect to='/' />;
  return (
    <form onSubmit={onLogin}>
      
      <FormInput name='Email' state={email} setState={setEmail}/>
      <FormInput name='Password' state={password} setState={setPassword}/>
      <button type='submit'>Login</button>
      <FormErrors errors={errors}/>
    </form>
  );
};

export default LoginForm;
