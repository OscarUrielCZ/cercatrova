const Utility = require('../models/utility');

const ctrl = {
    save: (req, res) => {
        let title = req.body.title;
        let desc = req.body.desc;
        let tech = req.body.technology;

        console.log(tech);

        let util = new Utility({
            title,
            desc,
            tech
        });

        util.save((err, utilDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: err
                });
            }

            return res.json({
                ok: true,
                utility: utilDB
            });
        });
    }
};

module.exports = ctrl;