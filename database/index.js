import mongoose from 'mongoose';
import { User } from './schemas.js'


mongoose.connect('mongodb://localhost/test_app', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(err => console.log(err));

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to Mongodb');
});

export const user = {
  get: (username, done) => {
    User.find({username: username}, (err, res) => {
      err ? done(err): done(null, res);
    });
  },
  create: (data, done) => {
    User.create(data,(err, res) => {
      err ? done(err): done(null, res);
    })
  },
  update: (id, data, done) => {
    User.updateOne({_id: id}, data, (err, res) => {
      err ? done(err) : done(null, res)
    });
  },
  delete: (id, done) => {
    User.deleteOne({_id: id}, data, (err, res) => {
      err ? done(err) : done(null, res)
    });
  },
}


