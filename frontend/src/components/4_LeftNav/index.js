import { NavLink } from 'react-router-dom';
import './LeftNav.css'

const channels = [
  {id: 1, privateStatus: false, name: '2021-10-18-online'},
  {id: 2, privateStatus: false, name: '2021-10-18-online-lecture-questions'},
  {id: 3, privateStatus: true, name: 'python-group-8-october'},
]

// const dms = [
//   {id: 1, name: 'Alex Smaldone, Joan Buck'},
//   {id: 2, name: 'Alex Smaldone, Joan Buck, Casey Spears'},
//   {id: 3, name: 'Geoffrey Otieno (he/him/his)'},
//   {id: 4, name: 'James Tuttle'},
// ]


export const SpacedLine = ({width, thickness=2, margin=null}) => (<><br /><div style={{borderTop: `solid black ${thickness}px`, marginLeft: 'auto', marginRight: 'auto', width, margin}} className="line" /><br /></>)

export const ListContainer = ({flexDirection='column', children, width='100%', height='100%'}) => <div style={{flexDirection, width, height}} className='list-container'>{children}</div>

const privateSymbol = privateStatus => privateStatus ? 'π' : '#'

const AddButton = ({name, symbolOnly=false, width='50%'}) => <button style={{width}} onClick={()=>alert(`Open create new ${name} form`)}>+ {symbolOnly ? '' : ` Add ${name}`}</button>
const DropButton = ({width='50%'}) => <button style={{width}} onClick={() => alert('Show/Hide')}>v</button>


export const ContainerHeader = ({flexDirection='row', children}) => <div style={{flexDirection}} className='container-header'>{children}</div>
export const ContainerBody = ({flexDirection='column', children}) => <div style={{flexDirection}} className='container-body'>{children}</div>

const LeftNav = () => {
  const ChannelsContainer = ListContainer
  // const DMsContainer = ListContainer

  return (
    <ListContainer width='40%' >
      <div className='main-header'>List Container!</div>
      <div style={{height: '100px'}}></div>
      <div style={{height: '100px'}}></div>

      <ChannelsContainer>
        <ContainerHeader>
          <div>Channels ______________________</div>
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
      </ChannelsContainer>
      
      <SpacedLine width='50%' margin='0' thickness='5' />
      
      
      {/* <DMsContainer>
        <ContainerHeader>
          <div>Direct Messages _____________________</div>
          {<AddButton name='DM' symbolOnly='true' width='5%'/>}
          <DropButton width='5%'/>
        </ContainerHeader>
        <ContainerBody>
          {dms.map(dm => (
            <NavLink to={`/dms/${dm?.id}`} key={dm?.id} activeClassName='active' >
              {dm?.name} 
            </NavLink>
          ))}
        </ContainerBody>
      </DMsContainer> */}

    </ListContainer>
  )
}

export default LeftNav;