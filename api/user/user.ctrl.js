//api 로직

const models = require('../../models.js');

const index = function(req, res) {
    req.query.limit = req.query.limit || 10;
    req.query.offset = req.query.offset || 0;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);

    if (Number.isNaN(limit)) return res.status(400).end();
    if (Number.isNaN(offset)) return res.status(400).end();

    models.User.findAll({
        limit: limit,
        offset: offset,
    }).then(users => {
        res.json(users);
    });
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.findById(id).then(user => {
        if (!user) return res.status(404).end();
        res.json(user);
    });
};

const destroy = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.destroy({ where: { id: id } }).then(user => {
        res.status(204).end();
    });
};

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    models.User.findOrCreate({ where: { name: name } }).then(user => {
        const userData = user[0];
        const isCreated = user[1];

        if (!isCreated) return res.status(409).end();
        res.status(201).json(userData);
    });
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;

    if (Number.isNaN(id)) return res.status(400).end();
    if (!name) return res.status(400).end();

    models.User.findOne({ where: { name: name } }).then(result => {
        if (result) return res.status(409).end();

        models.User.update({ name: name }, { where: { id: id } }).then(
            changed => {
                if (changed == 0) return res.status(404).end();

                models.User.findOne({ where: { id: id } }).then(user => {
                    res.json(user);
                });
            }
        );
    });
};

module.exports = {
    index,
    show,
    destroy,
    create,
    update,
};
