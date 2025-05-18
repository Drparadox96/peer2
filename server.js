import express from 'express';
import { PeerServer } from 'peer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Enable CORS
app.use(cors());

const peerServer = PeerServer({
  port: PORT,
  path: '/myapp',
  proxied: true, // important for reverse proxies like Render
});

app.use('/myapp', peerServer);

// Optional root response
app.get('/', (req, res) => {
  res.send('PeerJS server is up and running!');
});

app.listen(PORT, () => {
  console.log(`PeerJS server running on port ${PORT}`);
});
