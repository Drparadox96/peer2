import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for all origins
app.use(cors());

// Health-check endpoint
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

// Create HTTP server
const server = createServer(app);

// Track connected peers
const connectedPeers = new Set();

// Create PeerJS server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/', // internal path
  proxied: true,
});

// Add connection/disconnection listeners
peerServer.on('connection', (client) => {
  connectedPeers.add(client.getId());
  console.log(`✅ Peer connected: ${client.getId()} | Total connected: ${connectedPeers.size}`);
});

peerServer.on('disconnect', (client) => {
  connectedPeers.delete(client.getId());
  console.log(`❌ Peer disconnected: ${client.getId()} | Total connected: ${connectedPeers.size}`);
});

// Mount PeerJS server at /myapp
app.use('/myapp', peerServer);

// Start listening
server.listen(PORT, () => {
  console.log(`PeerJS server listening on port ${PORT}`);
});
