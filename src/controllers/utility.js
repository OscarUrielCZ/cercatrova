const Utility = require('../models/utility');

const ctrl = {
    save: (req, res) => {
        let title = req.body.title;
        let desc = req.body.desc;
        let tech = req.body.technology;
        let file = req.file;

        // let util = new Utility({

        // });

        console.log(req.body);
        console.log(file);
        res.send('Recived');
    }
};

module.exports = ctrl;