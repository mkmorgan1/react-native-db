import express from 'express';
const app = express();
const PORT = 8080;
import bcrypt from 'bcrypt';
import { user } from '../database/index'

app.use(express.urlencoded());
app.use(express.json());

/* RETRIEVES ALL USERS */
app.get('/allUsers', (req, res) => {
  user.getAll((err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

/* CHECKS IF A USERNAME IS AVAILABLE */
app.get('/check', (req, res) => {
  user.getOne(req.query, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send([response.length])
  })
})

/* LOGIN FOR EXISTING USER */
app.get('/user', async (req, res) => {
  /* RETRIEVE USER */
  const username = {username: req.query.username};
  let login;
  try {
    login = await new Promise((resolve, reject) => {
      user.getOne(username, (err, response) => {
        err ? reject(err): resolve(response);
      })
    })
    .then(data => data)
    .catch(err => console.error(err));
  } catch (e) {
    res.send('Error in database. Please try again.')
  }
  /* IF USER */
  if (!login.length) {
    res.send('No user found');
  } else {
  /* CHECK PASSWORD */
    const password = req.query.password;
    try {
      if (await bcrypt.compare(password, login[0].password)) {
        res.send(login);
      } else {
        res.send('Incorrect password')
      }
    } catch (e) {
      res.send('Error in password compare. Please try again.')
    }
  }
})

/* CREATES A USER */
app.post('/user', async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  req.body.password = password;
  user.create(req.body, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

/* UPDATES A USER */
app.put('/user', (req, res) => {
  user.update(req.body.id, req.body.data, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

/* DELETES A USER */
app.delete('/user', (req, res) => {
  user.delete(req.body.id, (err, response) => {
    err ? res.status(404).send(err): res.status(200).send(response)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});