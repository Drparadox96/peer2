import express from 'express';
import { PeerServer } from 'peer';

const app = express();
const port = process.env.PORT || 3000;

const peerServer = PeerServer({
  port: port,
  path: '/myapp',
  proxied: true
});

app.use('/', (req, res) => {
  res.send('PeerJS server is running');
});
