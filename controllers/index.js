const login = require("./login");
const register = require("./register");
const update = require("./update");
const destroy = require("./destroy");
const getAll = require("./getAll");
const getOne = require("./getOne");
const upload = require("./upload");

module.exports = {
    login, 
    register, 
    update,
    destroy,
    getAll,
    getOne,
    upload,
};
