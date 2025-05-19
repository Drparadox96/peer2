import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS so your anonchat.us frontend can connect
app.use(cors());

// Serve a simple health check
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

// Create a single HTTP server…
const server = createServer(app);

// …and mount the PeerJS server onto it as middleware:
const peerServer = ExpressPeerServer(server, {
  path: '/myapp',
  debug: true,
  proxied: true,
});
app.use('/myapp', peerServer);

// Now listen **only once**:
server.listen(PORT, () => {
  console.log(`PeerJS server listening on port ${PORT}`);
});
