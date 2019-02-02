const Technology = require('../models/technology');

const ctrl = {
    formsview: async(req, res) => {
        let allTech = await Technology.find();

        res.render('forms', {
            title: 'CT | Nuevo',
            techs: allTech,
            scripts: ['validations.js']
        });
    }
};

module.exports = ctrl;