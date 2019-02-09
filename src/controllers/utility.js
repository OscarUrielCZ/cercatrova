const ctrl = {
    save: (req, res) => {
        console.log(req.body);
        res.send('Recived');
    }
};

module.exports = ctrl;