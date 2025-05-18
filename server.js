const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();

// Use Render's dynamically assigned port or default to 10000
const PORT = process.env.PORT || 10000;

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});

// Attach PeerJS server to Express
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp' // You can change this if needed
});

// Mount the PeerJS server middleware
app.use('/myapp', peerServer);

// Optional: root endpoint for health check or info
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});
