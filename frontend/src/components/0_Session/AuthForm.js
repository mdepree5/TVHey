import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import {FormInput, FormErrors} from '../Utils/forms';

const AuthForm = ({signup}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signup && password !== repeatPassword) {
      setErrors(['Passwords must match']);
      alert('Passwords must match', errors);
      console.log('ERRORS', errors)
      return;
    }

    const user = signup ?
      await dispatch(signUp(username, email, password)) : 
      await dispatch(login(email, password));

    if (user?.errors) setErrors(user?.errors);
    return;
  };

  if (sessionUser) return <Redirect to='/' />;

  return (
    <form onSubmit={handleSubmit}>
      {signup && <FormInput name='Username' state={username} setState={setUsername} />}
      <FormInput name='Email' state={email} setState={setEmail}/>
      <FormInput type='password' name='Password' state={password} setState={setPassword}/>
      {signup && <FormInput required={true} type='password' name='Confirm Password' state={repeatPassword} setState={setRepeatPassword}/> }
      <button type='submit'>Sign Up</button>
      <FormErrors errors={errors}/>
    </form>
  );
};

export default AuthForm;
