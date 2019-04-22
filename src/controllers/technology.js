const Technology = require('../models/technology');

const ctrl = {
    save: (req, res) => {
        let name = req.body.name;

        let tech = new Technology({ name });

        tech.save((err, techDB) => {
            console.log('nomms', err);
            if (err) {
                return res.status(406).json({
                    ok: false,
                    message: err
                });
            }

            return res.json({
                ok: true,
                technology: techDB
            });
        });
    }
};

module.exports = ctrl;