import './utils.css';
/* 
viable icon names: 

cancel => <Icon iconName='cancel' />
delete => <Icon iconName='delete' />
edit => <Icon iconName='edit' />
expand => <Icon iconName='expand' />
send => <Icon iconName='send' />
*/

export const Icon = ({iconName, onClick}) => (
  <img onClick={onClick} className='icon' src={`https://capstone-slack-clone.s3.amazonaws.com/icons-gray/${iconName}.png`} alt='icon' />
)