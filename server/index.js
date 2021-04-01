import express from 'express';
const app = express();
const PORT = 8080;
import bcrypt from 'bcrypt';
import { user } from '../database/index'

app.use(express.urlencoded());
app.use(express.json());

app.get('/allUsers', (req, res) => {
  user.getAll((err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.get('/check', (req, res) => {
  user.getOne(req.query, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send([response.length])
  })
})

app.get('/user', (req, res) => {
  user.getOne(req.query, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.post('/user', async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  req.body.password = password;
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