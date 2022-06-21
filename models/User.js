import {mongoose} from 'mongoose'
const User = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: 'Vincent Vega',
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    roles: [{
      type: String,
      ref: 'Role'
    }],
    avatar: {
      type: String,
      required: false,
      default: 'https://disgustingmen.com/wp-content/uploads/2014/05/00001.mpls_snapshot_00.28.48_2013.05.03_11.12.18.png'
    }


})
export default mongoose.model('User', User)
