const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class LoginController {
    static async login(req, res) {

        try {
            const { email, pass } = await req.body;

            const user = await User.findOne({ email });

            if (user.pass == undefined) {
                return res.json({ msg: 'Usuário ou pass incorretos', error: false });
            };

            const passCompared = bcrypt.compareSync(pass, user.pass);

            if (!user || !passCompared) {
                return res.json({ msg: 'Usuário ou senha incorretos', status: false });
            };

            if (user && passCompared) {

                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
                    expiresIn: '7d' // expires in 5min
                });
                
                res.cookie('Authorization', token);

                const result = {
                    func: user.func,
                    status: true
                };
                return res.status(200).json({result, token});
            };

        } catch (error) {
            return res.status(500).json({ error: `${error}` });
        };
    };
};