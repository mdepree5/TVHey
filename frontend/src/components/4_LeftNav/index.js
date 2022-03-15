import { NavLink } from 'react-router-dom';
import './LeftNav.css'

const channels = [
  {id: 1, privateStatus: false, name: '2021-10-18-online'},
  {id: 2, privateStatus: false, name: '2021-10-18-online-lecture-questions'},
  {id: 3, privateStatus: true, name: 'python-group-8-october'},
]

const privateSymbol = privateStatus => privateStatus ? 'π' : '#'

const AddButton = ({name, symbolOnly=false, width='50%'}) => <button style={{width}} onClick={()=>alert(`Open create new ${name} form`)}>+ {symbolOnly ? '' : ` Add ${name}`}</button>
const DropButton = ({width='50%'}) => <button style={{width}} onClick={() => alert('Show/Hide')}>v</button>

export const ContainerHeader = ({flexDirection='row', children}) => <div style={{flexDirection}} className='container-header'>{children}</div>
export const ContainerBody = ({flexDirection='column', children}) => <div style={{flexDirection}} className='container-body'>{children}</div>

const LeftNav = () => {
  return (
    <div className='left-nav'>
      <div className='main-header'>List Header! <button>New</button></div>
      <div style={{height:'100px'}}></div>
      <div style={{height:'100px'}}></div>

      <div className='col-list'>
        <ContainerHeader>
          <div>Channels _______</div>
          <DropButton width='5%'/>
        </ContainerHeader>

        <ContainerBody>
          {channels.map(channel => (
            <NavLink to={`/channels/${channel?.id}`} key={channel?.id} activeClassName='active' >
              {privateSymbol(channel?.privateStatus)} {channel?.name}
            </NavLink>
          ))}
          <AddButton name='Channel'/>
        </ContainerBody>
      </div>
    </div>
  )
}

export default LeftNav;