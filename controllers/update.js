const { User } = require ("../models");

module.exports = {
    updateName: async (req, res, next) => {
        try {
            const { id }  = req.params;
            const { name } = req.body;

            const findUser = await User.findOne({ where: { id } });

            if (!findUser) {
                return res.status(404).json({
                    status: false,
                    message: "user not found",
                });
            }

            const updated = await User.update(
                {
                    name,
                },
                { where: { id } }
            );

            return res.status(200).json({
                status: true,
                message: "update name succesful",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    }, updateUsername: async (req, res, next) => {
        try {
            const { id }  = req.params;
            const { username } = req.body;

            const findUser = await User.findOne({ where: { id } });

            if (!findUser) {
                return res.status(404).json({
                    status: false,
                    message: "user not found",
                });
            }

            const updated = await User.update(
                {
                    username,
                },
                { where: { id } }
            );

            return res.status(200).json({
                status: true,
                message: "update username succesful",
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    },
}