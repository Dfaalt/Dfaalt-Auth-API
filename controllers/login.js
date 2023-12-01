require("dotenv").config();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {JWT_SECRET} = process.env;

module.exports = {
    login: async (req, res, next ) => {
        try {
            const { username, password } = req.body;

            const findUser = await User.findOne ({ where: { username } });

            if(!findUser) {
                return res.status(404).json({
                    status: false,
                    message: "Username or password isn't correct",
                });
            }

            const comparePassword = await bcrypt.compare(password, findUser.password);

            if(!comparePassword) {
                return res.status(401).json({
                    status: false,
                    message: "Username or password isn't correct",
                });
            }

            const payload = {
                id: findUser.id,
                username: findUser.username,
            };

            const token = jwt.sign(payload, JWT_SECRET);

            return res.status(200).json({
                status: true,
                message: "login succesful",
                data: { payload },
                token,
            });

        } catch (error) {
            next(error);
        }
    }
}