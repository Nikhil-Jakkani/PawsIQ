import app from './app.js';
import config from './config/config.js';

const port = config.port;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`PawsIQ Backend listening on http://${host}:${port}`);
});
