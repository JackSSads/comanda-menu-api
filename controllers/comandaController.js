const Comanda = require("../models/Comanda");

module.exports = class ComandaController {
    static async getAll(req, res) {
        try {
            const data = await Comanda.find({});

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Comanda.findOne({ _id: id });

            if (!data) return res.status(500).json({ message: "Erro ao buscar comanda" });

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async create(req, res) {
        const { nameClient, vessel, totalValue, status } = req.body;

        if (nameClient === "" || vessel === "" || totalValue === "" || status === "") return res.json({ message: "Preencha todos os campos" });

        try {
            const comanda = { nameClient, vessel, totalValue, status };

            await Comanda.create(comanda);

            return new Promise(() => res.status(201).json({ message: "Comanda cadastrada com sucesso", status: true }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}`, status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { products, totalValue, status } = req.body;

        try {

            const data = { products, totalValue, status };

            await Comanda.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Comanda atualizada" }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) return res.status(500).json({ message: "Cliente ineistente!" });

        try {
            await Comanda.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Comanda deletada " }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };
};