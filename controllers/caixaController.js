const Caixa = require("../models/Caixa");

module.exports = class CaixaController {
    static async getAll(req, res) {
        try {
            const data = await Caixa.find();

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await Caixa.findOne({ _id: id });

            if (!data) return res.status(500).json({ message: "Erro ao buscar Caixa", status: false });

            return new Promise(() => res.status(200).json({ data, status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async create(req, res) {
        const { comandas, totalValue, status } = req.body;

        if (comandas === "" || totalValue === "" || status === "") return res.json({ message: "Preencha todos os campos", status: false });

        try {
            const data = { comandas, totalValue, status };

            await Caixa.create(data);

            return new Promise(() => res.status(201).json({ message: "Caixa cadastrada com sucesso", status: true }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { products, totalValue, status } = req.body;

        try {

            const data = { products, totalValue, status };

            await Caixa.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Caixa atualizada", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) return res.status(500).json({ message: "Cliente ineistente!", status: true });

        try {
            await Caixa.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Caixa deletada", status: true }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ message: "Erro ao realizar requizição", status: false }));
        };
    };
};