import mongoose from 'mongoose';
import { User } from './schemas.js'


mongoose.connect('mongodb://localhost/test_app', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(err => console.log(err));

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to Mongodb');
});

export const user = {
  getOne: (data, done) => {
    User.find(data, (err, res) => {
      err ? done(err): done(null, res);
    });
  },
  getAll: (done) => {
    User.find({}, (err,res) => {
      err ? done(err): done(null, res);
    })
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
    User.deleteOne({_id: id}, (err, res) => {
      err ? done(err) : done(null, res)
    });
  },
}


