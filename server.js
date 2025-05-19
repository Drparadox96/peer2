import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for all origins (allows https://anonchat.us to connect)
app.use(cors());

// Health-check endpoint
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

// Create a single HTTP server
const server = createServer(app);

// Mount PeerJS server under '/myapp', with internal path '/'
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',       // Internal PeerJS path
  proxied: true,
});
app.use('/myapp', peerServer);

// Start listening (only one listen call)
server.listen(PORT, () => {
  console.log(`PeerJS server listening on port ${PORT}`);
});
