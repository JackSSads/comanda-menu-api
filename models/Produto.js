const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
    nameProduct: String,
    value: Number,
    qnt: Number,
    totalPrice: Number,
    category: String,
    status: Boolean
});

module.exports = Produto;
