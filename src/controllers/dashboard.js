const ctrl = {
    formsview: (req, res) => {
        res.render('forms', { title: 'Nuevo' });
    }
};

module.exports = ctrl;