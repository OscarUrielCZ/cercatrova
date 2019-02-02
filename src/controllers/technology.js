const fs = require('fs');
const path = require('path');

const Technology = require('../models/technology');

const ctrl = {
    save: async(req, res) => {
        let name = req.body.name;
        let image = req.file;
        let newFN = image.filename + path.extname(image.originalname);

        let tech = new Technology({
            name,
            image: newFN
        });

        tech.save((err, techDB) => {
            if (err) {
                fs.unlink(path.join(__dirname, '../public/uploads', image.filename), err => {
                    if (err)
                        console.log(err);
                });

                return res.status(406).json({
                    ok: false,
                    message: err
                });
            }

            try {
                fs.renameSync(image.path, path.join(image.destination, newFN));
            } catch (err) {
                return res.status(500).json({
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