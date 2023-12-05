const mongoose = require("mongoose");

const Comanda = mongoose.model("Comanda", {
    nameClient: String,
    vessel: String,
    products: Array,
    totalValue: Number,
    status: Boolean
});

module.exports = Comanda;