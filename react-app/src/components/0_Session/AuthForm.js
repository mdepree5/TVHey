import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { login, signUp } from '../../store/session';
import { FormInput, FormButton, FormErrors } from '../Utils/forms';
// todo ——————————————————————————————————————————————————————————————————————————————————
const AuthForm = ({signup}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector(state => state?.session?.user);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = signup ?
      await dispatch(signUp(username, email, password, confirmPassword)) : 
      await dispatch(login(email, password));

    if (user) setErrors(user);
    return;
  };

  if (sessionUser) return <Redirect to='/' />;
  // todo ——————————————————————————————————————————————————————————————————————————————————
  // todo                      Inline Validators
  // todo ——————————————————————————————————————————————————————————————————————————————————
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const emailValidation = emailRegex.exec(email) !== null;
  const usernameValidation = username.length > 2;
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordValidation = passwordRegex.exec(password) !== null;
  const confirmPasswordValidation = confirmPassword && confirmPassword === password;
  
  const loginValidation = emailValidation && passwordValidation;
  const signupValidation = usernameValidation && confirmPasswordValidation;

  return (
    <form onSubmit={handleSubmit}>
      {signup && 
        <FormInput name='Username' validation={usernameValidation} message='Provide a valid username' state={username} setState={setUsername}/>}
      
      <FormInput name='Email' validation={emailValidation} message={signup ? 'Provide a valid email' : 'Enter your email'} state={email} setState={setEmail}/>
      <FormInput name='Password' validation={passwordValidation} message={signup ? '8 chars : Uppercase : lowercase : number : special' : 'Enter your password'} type='password' state={password} setState={setPassword}/>
      
      {signup && 
        <FormInput name='Confirm Password' validation={confirmPasswordValidation} message='Passwords must match' type='password' state={confirmPassword} setState={setConfirmPassword}/> }
      
      <small style={{fontSize:'0.8em', color:'#EC8642'}}>* = required</small>
      
      <FormButton validation={loginValidation} disabledLogic={signup ? !(loginValidation && signupValidation): !loginValidation} buttonNameLogic={signup ? 'Sign Up' : 'Log In'} />

      <FormErrors errors={errors}/>
    </form>
  );
};

export default AuthForm;


//<div className='dropdown-button-container'>
//  <button className={loginValidation ? 'input-valid' : 'button-invalid'} type='submit' disabled={signup ? !(loginValidation && signupValidation): !loginValidation}>{signup ? 'Sign Up' : 'Log In'}</button>
//  <div className='dropdown-button-content'>
//    Please fill out required fields
//  </div>
//</div>