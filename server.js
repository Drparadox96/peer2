import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';

const app = express();
const PORT = process.env.PORT || 10000;

const server = createServer(app);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp'
});

app.use('/myapp', peerServer);

app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

server.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});
