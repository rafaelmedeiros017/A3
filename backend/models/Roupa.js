import mongoose from "mongoose";

const roupaSchema = new mongoose.Schema({
    marca: String,
    tamanho: String,
    cor: String,
    preco: Number,
    imagem: String,
    tipo: String, // camiseta, calça, vestido, jaqueta, etc
    material: String,
    descricao: String,
    estoque: Number,
});

const Roupa = mongoose.model("Roupa", roupaSchema);
export default Roupa;
