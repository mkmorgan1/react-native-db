import Express from 'express';
const app = Express();
const PORT = 8080;

import { user } from '../database/index'

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});