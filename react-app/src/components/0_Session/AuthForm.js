import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { signUp, login } from '../../store/session';
import {FormInput, InlineFormValidation, FormErrors} from '../Utils/forms';
// todo ——————————————————————————————————————————————————————————————————————————————————
const AuthForm = ({signup}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signup && password !== confirmPassword) {
      setErrors(['Passwords must match']);
      alert('Passwords must match', errors);
      console.log('ERRORS', errors)
      return;
    }

    const user = signup ?
      await dispatch(signUp(username, email, password, confirmPassword)) : 
      await dispatch(login(email, password));

    console.log(`%c user: ${user}`, `color:yellow`)
    console.log(`%c user:`, `color:yellow`, user)
    console.log(`%c user: ${user?.errors}`, `color:yellow`) //=> undefined

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
  


  return (
    <form onSubmit={handleSubmit}>
      {signup && 
        <div className='row-list'>
          <FormInput name='Username' state={username} setState={setUsername} />
          <InlineFormValidation validation={usernameValidation} message='Provide a valid username' />
        </div>
      }

      <div className='row-list'>
        <FormInput name='Email' state={email} setState={setEmail}/>
        {signup && <InlineFormValidation validation={emailValidation} message='Provide a valid email' />}
      </div>

      <div className='row-list'>
        <FormInput type='password' name='Password' state={password} setState={setPassword}/>
        {signup && <InlineFormValidation validation={passwordValidation} message='A a 1 !' />}
      </div>

      {signup && 
        <div className='row-list'>
          <FormInput required={true} type='password' name='Confirm Password' state={confirmPassword} setState={setConfirmPassword}/> 
          <InlineFormValidation validation={confirmPasswordValidation} message='Passwords must match' />
        </div>
      }
      <button type='submit'>{signup ? 'Sign Up' : 'Log In'}</button>
      <FormErrors errors={errors}/>
    </form>
  );
};

export default AuthForm;
