import { useHistory } from 'react-router-dom';
import './Navigation.css'
// ???? ——————————————————————————————————————————————————————————————————————————————————

const HomeIcon = () => {
  const history = useHistory();

  return (
    <img className='navicon' onClick={() => history.push('/')}
      src='https://capstone-slack-clone.s3.amazonaws.com/favicon.ico' alt='custom'
    />
  )
}

export default HomeIcon;