import './Footer.css';

const Footer = () => {
  const Top = () => <div style={{cursor: 'pointer'}} onClick={() => window.scroll({top: 0, left: 0, behavior: 'smooth'})}>Top</div>
  const Foot = ({children}) => <div className='footer'>{children}</div>
  const GitHub = () => <a href='https://github.com/mdepree5'>Github</a>
  const AppAcademy = () => <a href='https://www.appacademy.io/'>App Academy</a>

  return (
    <Foot>
      <Top/>
      <GitHub/>
      <AppAcademy/>
    </Foot>
  )
}

export default Footer;