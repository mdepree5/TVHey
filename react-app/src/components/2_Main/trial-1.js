const Home = () => {
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // const domain = (process.env.NODE_ENV === 'production') ? 'https://tvhey.herokuapp.com/' : '';
  const [chatInput, setChatInput] = useState('');
  const sessionUser = useSelector(state => state?.session?.user);
  const channelId = 1;

  let socket

  
  const openConnection = () => {
    socket = io();
    socket.on("connect", () => {
      console.log(`%c Socket connected`, `color:#00ff44`, socket)
      console.log('%c socket.connected', 'color:#00ff44', socket.connected); // true
      console.log('%c socket.disconnected', 'color:#00ff44', socket.disconnected); // false

      const engine = socket.io.engine;
      console.log(`%c engine:`, `color:yellow`, engine)
      console.log(engine.transport.name); // in most cases, prints "polling"
      
      engine.once("upgrade", () => {
        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log(engine.transport.name); // in most cases, prints "websocket"
      });
    
      engine.on("packet", ({ type, data }) => {
        // called for each packet received
      });
    
      engine.on("packetCreate", ({ type, data }) => {
        // called for each packet sent
      });
    
      engine.on("drain", () => {
        // called when the write buffer is drained
      });
    
      engine.on("close", (reason) => {
        // called when the underlying connection is closed
      });

    });
  }
  
  const closeConnection = () => {
    socket.disconnect()
    console.log(`%c Socket disconnected`, `color:red`, socket)
    console.log('%c socket.connected', 'color:red', socket.connected); // false
    console.log('%c socket.disconnected', 'color:red', socket.disconnected); // true
  }


  // const sendChat = async e => {
  //   e.preventDefault()  
  //   socket.emit('chat', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
  //   setChatInput('')
  // }

  // const dayjs = require('dayjs');
  // socket.on('all_channels', all_channels => {
  //   all_channels.all_channels.forEach(channel => {
  //     const parsed = JSON.parse(channel)
  //     console.log('format date', dayjs(parsed?.created_at).format('h:mm A'))
  //   })
  // });

  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // todo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


  return (
    <div className='home'>
      <div className='header'></div>
      <div style={{height:'200px'}}/>

      <button onClick={openConnection}>Open Socket</button>
      <button onClick={closeConnection}>Close Socket</button>
      
      {/* <form onSubmit={sendChat} >
        <input value={chatInput} onChange={e => setChatInput(e.target.value)} />
        <button type="submit" >Send Chat</button>
      </form> */}

      <div className='home-screen col-list'>
        <strong>Welcome to TVHey</strong>
        a multiversal communication platform
        <ChannelFormModal name='Make a new channel' />
      </div>
    </div>
  )
}