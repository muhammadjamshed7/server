// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Adjust this to your React app's URL
//     methods: ['GET', 'POST']
//   }
// });

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Chatbot server is running');
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('message', (msg) => {
//     console.log('Received message from client:', msg); // Debugging log
//     if (msg.toLowerCase() === 'hi') {
//       socket.emit('message', 'Thanks for reaching out to us. How can we help you?');
//     }
//     else if(msg.toLowerCase()==="visa"){
//       socket.emit('message', 'Hum apko visa dengy');
//       console.log(msg)

//     }
//     else if(msg.toLowerCase().includes('tour')){
//       socket.emit('message', 'Q bhai ama ki shadi hai ');
//       console.log(msg)

//     }
//     else if(msg.toLowerCase()==="burj khalifa"){
//       socket.emit('message', 'burj khalifa');
//       console.log(msg)

//     }
//     else if(msg.toLowerCase()==="dubai"){
//       socket.emit('message', 'Dubai ');
//       console.log(msg)

//     }
//     else if(msg.toLowerCase()==="sharja"){
//       socket.emit('message', 'sharja');
//       console.log(msg)

//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Adjust this to your React app's URL
//     methods: ['GET', 'POST']
//   }
// });

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Chatbot server is running');
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('message', (msg) => {
//     console.log('Received message from client:', msg); // Debugging log

//     // Check for specific keywords in the message
//     if (msg.toLowerCase().includes('tour')) {
//       socket.emit('message', 'Sure, we offer various tours. How can I assist you with your travel plans?');
//     }
//     else if (msg.toLowerCase().includes('visa')) {
//       socket.emit('message', 'We provide visa processing services. Please specify your requirements.');
//     }
//     else if (msg.toLowerCase().includes('burj khalifa')) {
//       socket.emit('message', 'Burj Khalifa is a popular attraction in Dubai. Would you like more information about visiting it?');
//     }
//     else if (msg.toLowerCase().includes('dubai')) {
//       socket.emit('message', 'Dubai is known for its luxury shopping, ultramodern architecture, and lively nightlife.');
//     }
//     else if (msg.toLowerCase().includes('sharjah')) {
//       socket.emit('message', 'Sharjah is known for its cultural heritage and art scenes. Are you interested in exploring Sharjah?');
//     }
//     else {
//       // Default response for unrecognized messages
//       socket.emit('message', 'I apologize, I do not understand. How can I assist you today?');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Adjust this to your React app's URL
//     methods: ['GET', 'POST']
//   }
// });

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Chatbot server is running');
// });

// // Read responses from responses.json
// let responses = [];
// fs.readFile('responses.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading responses.json:', err);
//     return;
//   }
//   responses = JSON.parse(data);
// });

// // Function to find response based on message
// function findResponse(message) {
//   const msgLower = message.toLowerCase();
//   for (let i = 0; i < responses.length; i++) {
//     const keyword = responses[i].keyword.toLowerCase();
//     if (msgLower.includes(keyword)) {
//       return responses[i].response;
//     }
//   }
//   return null; // Return null if no matching keyword found
// }

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('message', (msg) => {
//     console.log('Received message from client:', msg); // Debugging log

//     // Find response based on message
//     const response = findResponse(msg);
//     if (response) {
//       socket.emit('message', response);
//     } else {
//       socket.emit('message', 'I apologize, I do not understand. How can I assist you today?');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



///


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust this to your React app's URL
    methods: ['GET', 'POST']
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Chatbot server is running');
});

let responses = [];

// Read responses from responses.json synchronously on server start
try {
  const data = fs.readFileSync('responses.json', 'utf8');
  responses = JSON.parse(data);
} catch (err) {
  console.error('Error reading responses.json:', err);
}

// Function to find response based on message
function findResponse(message) {
  const msgLower = message.toLowerCase();
  for (let i = 0; i < responses.length; i++) {
    const keywords = responses[i].keywords.map(keyword => keyword.toLowerCase());
    const matchedKeyword = keywords.find(keyword => msgLower.includes(keyword));
    if (matchedKeyword) {
      return responses[i].response;
    }
  }
  return null; // Return null if no matching keyword found
}

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('Received message from client:', msg); // Debugging log

    // Find response based on message
    const response = findResponse(msg);
    if (response) {
      // Handle different types of responses
      if (typeof response === 'string') {
        socket.emit('message', response);
      } else if (response.type === 'images_with_prices') {
        socket.emit('images_with_prices', response.images);
      } else if (response.type === 'hotel_options') {
        socket.emit('hotel_options', response.options);
      } else {
        socket.emit('message', 'I apologize, I do not understand. How can I assist you today?');
      }
    } else {
      socket.emit('message', 'I apologize, I do not understand. How can I assist you today?');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
