// import { useState, useEffect } from 'react';
import './utils.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
export const FormInput = ({ required, type, name, state, setState }) => {
  const formatName = name.toLowerCase().split(' ').join('-');
  // const [inputError, setInputError] = useState();
  
  // useEffect(() => {
  //   if(!state) setInputError(true);
  // }, [state])

  return (
    <div className='form-input'>
      <label htmlFor={formatName}>{name} {required && <small style={{fontSize:'0.8em', color:'#EC8642'}}>*required</small>}</label>
      <div className='row-list'>
        <input 
          placeholder={name}
          name={formatName}
          type={type || 'text'}
          value={state}
          onChange={e => setState(e.target.value)}
        />
        {/* {!inputError && <div>✅</div>} */}
      </div>
    </div>
  )
}

export const FormErrors = ({errors}) => (
  <div className='errors'>
    {errors.map((error, ind) => (
      <div key={ind}>{error}</div>
    ))}
  </div>
)