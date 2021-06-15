const UserModel = require('./user.model');

module.exports.getUsers = async function (req, res) {
    try {
        let users = await UserModel.find();
        return res.status(200).json({
            status: 200,
            data: users,
            message: "Succesfully Retrieved Users"
        });
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

module.exports.addUser = async function (req, res) {
    try {
        let username = req.body.name ? req.body.name : 'unnamed';
        console.log(username);
        let docs = await UserModel.create({
            name: username
        });
        return res.status(200).json({
            status: 200,
            message: "Succesfully Created User"
        });
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}
