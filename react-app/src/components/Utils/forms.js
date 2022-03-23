import './utils.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
export const FormInput = ({ required=true, type, name, state, setState, validation, message}) => {
  const formatName = name.toLowerCase().split(' ').join('-');

  return (
    <div className='form-input'>
      <label htmlFor={formatName}>{name}</label>
      <div className='row-list'>
        <input 
          placeholder={name}
          name={formatName}
          type={type || 'text'}
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <div className={`inline-form-validation ${validation ? 'input-valid' : 'input-invalid'}`}>
          {validation ? <>✅ {message}</> : <>{message}</>}
          {required && <small style={{fontSize:'0.8em', color:'#EC8642'}}> *</small>}         
        </div>
      </div>
    </div>
  )
}

export const FormButton = ({ validation, disabledLogic, buttonNameLogic }) => (
  <div className={validation ? 'dropdown-button-container' : 'dropdown-button-container-invalid'}>
    <button className={validation ? 'input-valid' : 'button-invalid'} type='submit' disabled={disabledLogic}>{buttonNameLogic}</button>
    <div className='dropdown-button-content'>
      Please fill out required fields
    </div>
  </div>
)



export const FormErrors = ({errors}) => (
  <div className={errors.length && 'errors'}>
    {errors.map((error, ind) => (
      <div key={ind}>{error}</div>
    ))}
  </div>
)