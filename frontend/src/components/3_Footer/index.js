import './Footer.css';

const Footer = () => {
  const Foot = ({children}) => <div className='footer'>{children}</div>
  const GitHub = () => <a href='https://github.com/mdepree5'>Github</a>
  const LinkedIn = () => <a href='https://www.linkedin.com/in/mitch-depree-4a5686155/'>LinkedIn</a>

  return (
    <Foot>
      <GitHub/>
      <LinkedIn/>
    </Foot>
  )
}

export default Footer;