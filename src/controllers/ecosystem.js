const ctrl = {
    save: (req, res) => {
        console.log('Hola');
        console.log(req);
        res.json({
            message: 'recived'
        });
    }
};

module.exports = ctrl;