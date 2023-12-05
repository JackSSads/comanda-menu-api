const Produto = require("../models/Produto");

module.exports = class ProdutoController {
    static async getAll(req, res) {
        try {
            const data = await Produto.find({});

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Produto.findOne({ _id: id });

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async create(req, res) {
        const { nameProduct, value, qnt, totalPrice, category, status } = req.body;

        if (nameProduct === "" || value === "" || qnt === null) return res.json({ message: "Todos os campos são obrigatórios" });

        try {
            const data = { nameProduct, value, qnt, totalPrice, category, status };

            await Produto.create(data);

            return new Promise(() => res.status(200).json({ message: "Produto cadastrado com sucesso" }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { nameProduct, value, qnt, totalPrice } = req.body;

        try {
            const data = { nameProduct, value, qnt, totalPrice };

            await Produto.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Produto atualizado!" }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) return res.status(500).json({ message: "Cliente ineistente!" });

        try {
            await Produto.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Comanda deletada " }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };
}