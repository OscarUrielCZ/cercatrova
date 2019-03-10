const Technology = require('../models/technology');
const Utility = require('../models/utility');

const ctrl = {
    formsview: async(req, res) => {
        let allTech = await Technology.find();

        res.render('forms', {
            title: 'CT | Nuevo',
            techs: allTech,
            scripts: ['validations.js']
        });
    },
    utilitiesview: async(req, res) => {
        let allUtilities = await Utility.find();

        res.render('catalog', {
            title: 'CT | Utilidades',
            utils: allUtilities,
            scripts: []
        });
    }
};

module.exports = ctrl;