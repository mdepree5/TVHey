import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import {FormInput, FormErrors} from '../Utils/forms';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) setErrors(data)
    }
  };

  if (user) return <Redirect to='/' />;

  return (
    <form onSubmit={onSignUp}>
      <FormInput name='Username' state={username} setState={setUsername} />
      <FormInput name='Email' state={email} setState={setEmail}/>
      <FormInput name='Password' state={password} setState={setPassword}/>
      <FormInput name='Confirm Password' state={repeatPassword} setState={setRepeatPassword}/>
      <button type='submit'>Sign Up</button>
      <FormErrors errors={errors}/>
    </form>
  );
};

export default SignUpForm;
