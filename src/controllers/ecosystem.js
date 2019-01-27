const fs = require('fs');
const path = require('path');

const Ecosystem = require('../models/ecosystem');

const ctrl = {
    save: async(req, res) => {
        let name = req.body.name;
        let image = req.file;
        let newFN = image.filename + path.extname(image.originalname);

        try {
            fs.renameSync(image.path, path.join(image.destination, newFN));
        } catch (err) {
            throw err;
        }

        let eco = new Ecosystem({
            name,
            image: newFN
        });

        let neweco = await eco.save();

        res.json({
            ok: true,
            ecosystem: neweco
        });
    }
};

module.exports = ctrl;