const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'User name must be at least 3, got {VALUE}'],
    required: [true, 'User name required']
  },
  number: {
    type: String,
    minLength: [9, 'User phone number must be at least 8, got {VALUE}'],
    required: [true, 'User phone number required'],
  },
})

const validator = function(value) {
  return /^\d{2,3}-\d+$/.test(value)
}

personSchema.path('number').validate(validator, '`{VALUE}` is an invalid phone number')


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)