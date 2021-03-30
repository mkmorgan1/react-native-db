import { Schema, model} from 'mongoose';

const UserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  name: String,
  bio: String,
})

export const User = model('users', UserSchema);