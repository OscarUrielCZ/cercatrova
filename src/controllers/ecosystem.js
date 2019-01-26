const ctrl = {
    save: (req, res) => {
        console.log(req.body);
        res.send('Saved');
    }
};

module.exports = ctrl;