const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = class UserController {
    static async getAll(req, res) {
        try {
            const data = await User.find();

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const data = await User.findOne({ _id: id });

            if (!data) return res.status(500).json({ message: "Erro ao buscar usuário" });

            return new Promise(() => res.status(200).json(data));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async create(req, res) {
        const { nameUser, func, email, pass } = req.body;

        try {
            const user = { nameUser, func, email, pass: bcrypt.hashSync(pass, 8) };

            await User.create(user);

            return new Promise(() => res.status(201).json({ message: "Usuário cadastrado com sucesso" }));

        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async updateById(req, res) {
        const { id } = req.params;
        const { nameClient, func, email, pass } = req.body;

        try {

            const data = { nameClient, func, email, pass };

            await User.updateOne({ _id: id }, data);

            return new Promise(() => res.status(200).json({ message: "Comanda atualizada" }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };

    static async deleteById(req, res) {
        const { id } = req.params;

        if (!id) return res.status(500).json({ message: "Cliente ineistente!" });

        try {
            await User.deleteOne({ _id: id });

            return new Promise(() => res.status(200).json({ message: "Usuário deletado" }));
        } catch (error) {
            return new Promise(() => res.status(500).json({ error: `${error}` }));
        };
    };
};