import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
// todo ——————————————————————————————————————————————————————————————————————————————————
import { signUp, login } from '../../store/session';
import {FormInput, FormErrors} from '../Utils/forms';
// todo ——————————————————————————————————————————————————————————————————————————————————
const AuthForm = ({signup}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  
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

    console.log(`%c user: ${user}`, `color:yellow`)

    if (user?.errors) setErrors(user?.errors);
    return;
  };


  // useEffect(()=> {
  //   const errors = [];
  //   if(!username) errors.push('What is your property called? We\'d love to know!');
  //   if(!username) errors.push('What is your property called? We\'d love to know!');
  //   if(!email) errors.push('What is your property called? We\'d love to know!');
  //   if(!password) errors.push('What is your property called? We\'d love to know!');
  //   if(!password && repeatPassword !== password) errors.push('What is your property called? We\'d love to know!');
  
  //   setValidationErrors(errors);
  // }, [username, numberOfBeds, price, address, city, state, zipcode])

  if (sessionUser) return <Redirect to='/' />;
  // todo ——————————————————————————————————————————————————————————————————————————————————
  // todo                      Inline Validation Booleans
  // todo ——————————————————————————————————————————————————————————————————————————————————
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const emailValidation = email && (emailRegex.exec(email) !== null);
  const usernameValidation = username && username.length > 4;
  
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const passwordRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const passwordValidation = password && (passwordRegex2.exec(password) !== null);
  


  return (
    <form onSubmit={handleSubmit}>
      {signup && 
      <>
        <FormInput name='Username' state={username} setState={setUsername} />
        {usernameValidation && <div>✅</div>}
      </>
        }
      <div className='row-list'>
        <FormInput inputError={email} name='Email' state={email} setState={setEmail}/>
          <div className={`row-list ${emailValidation ? 'input-valid' : 'input-invalid'}`}>
            Provide a valid email
            {emailValidation && <div>✅</div>}
          </div>
      </div>
      <FormInput inputError={password} type='password' name='Password' state={password} setState={setPassword}/>
        {passwordValidation && <div>✅</div>}
      {signup && <FormInput inputError={!password && password !== repeatPassword} required={true} type='password' name='Confirm Password' state={repeatPassword} setState={setRepeatPassword}/> }
      <button type='submit'>Sign Up</button>
      <FormErrors errors={errors}/>
    </form>
  );
};

export default AuthForm;
