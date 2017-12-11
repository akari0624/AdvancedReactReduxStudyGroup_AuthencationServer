import mongoose from 'mongoose';

const schema = mongoose.schema;

// define our model
const userSchema = new Schema({
  
   email:{type:String,unique:true,lowercase:true},
   password:String
});

const ModelClass = mongoose.model('user',userSchema);

// export the model

model.exports = ModelClass;
