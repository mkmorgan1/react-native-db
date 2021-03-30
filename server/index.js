import express from 'express';
const app = express();
const PORT = 8080;

import { user } from '../database/index'

app.use(express.urlencoded());
app.use(express.json());

app.get('/allUsers', (req, res) => {
  user.getAll((err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.get('/user', (req, res) => {
  console.log(req.query);
  user.getOne(req.query, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.post('/user', (req, res) => {
  user.create(req.body, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.put('/user', (req, res) => {
  user.update(req.body.id, req.body.data, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.delete('/user', (req, res) => {
  user.delete(req.body.id, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});