import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  combustivel: String,
  km: Number,
  preco: Number,
  imagem: String,
  ivaDedutivel: Boolean,
});

const Car = mongoose.model('Car', carSchema);
export default Car;

