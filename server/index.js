import express from 'express';
const app = express();
const PORT = 8080;

import { user } from '../database/index'

app.use(express.urlencoded());
app.use(express.json());

app.get('/user', (req, res) => {
  res.send('user')
})

app.post('/user', (req, res) => {
  user.create(req.body, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

// app.put('/user')

app.delete('/user', (req, res) => {
  user.delete(req.body.id, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});