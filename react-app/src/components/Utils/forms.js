import './utils.css';
// todo ——————————————————————————————————————————————————————————————————————————————————
export const FormInput = ({ required, type, name, state, setState }) => {
  const formatName = name.toLowerCase().split(' ').join('-');

  return (
    <div className='form-input'>
      <label htmlFor={formatName}>{name}</label>
      <input 
        placeholder={name}
        name={formatName}
        type={type || 'text'}
        value={state}
        onChange={e => setState(e.target.value)}
        required={required || false}
      />
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