// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Javascript built in WebSocket object
// todo ——————————————————————————————————————————————————————————————————————————————————

  // const webSocket = useRef(null);

  // useEffect(() => {
  //   if (!sessionUser) return;

  //   const ws = new WebSocket('ws://localhost:3000/');
  //   webSocket.current = ws;

  //   ws.onopen = e => console.log(`Connection open: ${e}`)
  
  //   console.log(`%c ws:`, `color:yellow`, ws)
  // }, [sessionUser])

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               App useEffect(() => {})
// todo ——————————————————————————————————————————————————————————————————————————————————
// import {setSocket} from './store/socket';
// socket.on("connect_error", () => {
  //   // revert to classic upgrade
  //   socket.io.opts.transports = ["polling", "websocket"];
  // });
  
  
// const sockstate = dispatch(setSocket(socket));
// console.log(`%c sockstate:`, `color:yellow`, sockstate)


// todo ——————————————————————————————————————————————————————————————————————————————————
// todo               openConnection, closeConnection buttons
// todo ——————————————————————————————————————————————————————————————————————————————————
  // let socket
  // const openConnection = () => {
  //   socket = io();
  //   socket = io('https://tvhey-staging.herokuapp.com/', {
  //     transports: ["websocket", "polling"] // use WebSocket first, if available
  //   });

  //   socket.on("connect_error", () => {
  //     // revert to classic upgrade
  //     socket.io.opts.transports = ["polling", "websocket"];
  //   });



  //   socket.on("connect", () => {
  //     console.log(`%c Socket connected`, `color:#00ff44`, socket)
  //     console.log('%c socket.connected', 'color:#00ff44', socket.connected); // true
  //     console.log('%c socket.disconnected', 'color:#00ff44', socket.disconnected); // false
  //   });
    
  //   // socket.on('response', response => console.log(`%c Front end connection:`, `color:#00ff44`, response));
  // }
  
  // const closeConnection = () => {
  //   socket.disconnect()
  //   console.log(`%c Socket disconnected`, `color:red`, socket)
  //   console.log('%c socket.connected', 'color:red', socket.connected); // false
  //   console.log('%c socket.disconnected', 'color:red', socket.disconnected); // true
  // }

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Authenticated App Component
// todo ——————————————————————————————————————————————————————————————————————————————————
// import { io } from 'socket.io-client';

// const dayjs = require('dayjs');
  // let socket;
  // const domain = (process.env.NODE_ENV === 'production') ? '/api' : '';
  // const domain = '';
  // const domain = (process.env.NODE_ENV === 'production') ? 'https://tvhey.herokuapp.com/' : '';

  // socket = io(domain);
  // console.log(`%c socket:`, `color:yellow`, socket)
  // socket = io();
  // console.log('authenticated app', socket)
  
  // socket.on('response', response => console.log('frontend connection', response));
  // socket.on('all_channels', all_channels => console.log('all_channels', all_channels));
  // socket.on('all_channels', all_channels => {
  //   console.table(all_channels.all_channels)
  //   all_channels.all_channels.forEach(channel => {
  //     const parsed = JSON.parse(channel)
  //     // console.log('one channel', parsed)
  //     // console.log('created at', parsed?.created_at)
  //     console.log('format date', dayjs(parsed?.created_at).format('h:mm A'))
  //   })
  // });


  // socket.on('all_users', all_users => console.log('frontend all users', all_users));

    // socket.on('chat', message => dispatch(createMessage(message)));

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Chat Component
// todo ——————————————————————————————————————————————————————————————————————————————————
// import { io } from 'socket.io-client';

// useEffect(() => {
  //   socket.on('chat', message => dispatch(createMessage(message)));
  // }, [dispatch])
  
  // const sendChat = async e => {
  //   e.preventDefault()  
  //   socket.emit('chat', {author_id: sessionUser?.id, channel_id: Number(channelId), content: chatInput});
  //   setChatInput('')
  // }

// todo ——————————————————————————————————————————————————————————————————————————————————
// todo                               Slider
// todo ——————————————————————————————————————————————————————————————————————————————————

// const SizeSlider = () => {
//   const [fontSize, setFontSize] = useState(16)
//   const bod = document.getElementById('body');
//   console.log(`%c bod:`, `color:yellow`, bod)
//   console.log(`%c bod:`, `color:yellow`, bod.style)
//   console.log(`%c bod:`, `color:yellow`, bod.style.fontSize)

//   const onSave = () => {
//     bod.style.fontSize=`${fontSize.toString()}px`
//   }

//   return (
//     <>
//       <ReactSlider
//         value={fontSize}
//         onAfterChange={(val) => {setFontSize(val)}}
//         className="font-size-slider"
//         thumbClassName="font-size-thumb"
//         trackClassName="font-size-track"
//         ariaLabel={"Change Font Size"}
//         orientation="horizontal"
//         min={12}
//         max={50}
//         renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
//         renderTrack={(props, state) => (
//           <div {...props} index={state.index}></div>
//         )}
//         invert
//         pearling
//         minDistance={1}
//       />
//       <button onClick={onSave} >Save size</button>
//     </>
//   )
// }

// ???? ——————————————————————————————————————————————————————————————————————————————————
// ????                               Slider CSS
// ???? ——————————————————————————————————————————————————————————————————————————————————

// .font-size-slider { height: 20px; }

// .font-size-thumb {
//   height: 30px;
//   line-height: 30px;
//   width: 30px;
//   text-align: center;
//   background-color: #000;
//   color: #fff;
//   border-radius: 50%;
//   cursor: grab;
//   font-size: 20px;
//   padding: 5px;
// }

// .font-size-track {
//   top: 0;
//   bottom: 0;
//   /* background: gray; */
//   border-radius: 999px;
//   /* left: 5px; */
//   width: 100px;
//   border: 2px solid blue;
// }

// /* .font-size-track.font-size-track-0 {
//   background: red; 
// } */