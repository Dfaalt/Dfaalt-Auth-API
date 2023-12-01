const { User } = require("../models");
const bcrypt = require('bcrypt');

module.exports = {
    register : async(req, res, next) => {
        try {
            const { name, username, password, is_verified = true } = req.body;

            const findUser = await User.findOne({ where: { username } });

            if (findUser) {
                return res.status(409).json({
                    status: false,
                    message: "username already exist",
                    data: null,
                });
            }

            if(password.length < 8){
                return res.status(400).json({
                    status: false,
                    message: "password less than 8 characters",
                    data: null,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const created = await User.create({
                name, 
                username, 
                password:hashedPassword, 
                is_verified,
            });

            return res.status(201).json({
                status: true,
                message: "create data user succesful",
                data: {
                    id: created.id,
                    name: created.name,
                    username: created.username,
                },
            });

        } catch (error) {
            next(error);
        }
    },
};