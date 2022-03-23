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

