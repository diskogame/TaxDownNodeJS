module.exports = {
    checkFields: function(req, res) {
        var error = 0;
        if (req.body.name == null || req.body.name == '') {
            error = 1;
        }

        if (req.body.password == null || req.body.password == '') {
            error = 1;
        }

        if (req.body.credit == null || req.body.credit == '') {
            error = 1;
        }

        if (error == 1) {
            res.status(500);
            res.send("No se acepta valor vacio");
        }
        return error;
    },
    checkCredit: function(req, res) {
        var error = 0;
        if (req.body.credit == null || req.body.credit == '') {
            error = 1;
        }

        if (error == 1) {
            res.status(500);
            res.send("No se acepta valor vacio");
        }
        return error;
    },

    createCustomer: function(valName, valPassword, valCredit) {
        var newCustomer = {
            name: valName,
            password: valPassword,
            credit: valCredit
        }
        return newCustomer;
    }
};