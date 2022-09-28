var express = require('express');
var app = express();
var fs = require("fs");
var listCustomers;

var Utils = require('./Utils');

/*Funciones necesarias para poder leer del body de las request*/
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
/*-----*/

var SEQ_CUSTOMERS = 0;

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        listCustomers = JSON.parse(data); //Convirte el JSON a un objeto
        SEQ_CUSTOMERS = Object.keys(listCustomers).length + 1;
    });
})

app.get('/listCustomers', function (req, res) {
    console.log(JSON.stringify(listCustomers));
    res.end(JSON.stringify(listCustomers));
})


//CREATE
app.post('/add', function (req, res) {
    if(Utils.checkFields(req, res) == 1) {
        return;
    }
    var name = req.body.name;
    var password = req.body.password;
    var credit = req.body.credit;
    newCustomer = Utils.createCustomer(name, password, credit);

    listCustomers[SEQ_CUSTOMERS] = newCustomer;
    console.log(JSON.stringify(listCustomers));
    res.end("Customer añadido con exito, id = " + SEQ_CUSTOMERS);
    SEQ_CUSTOMERS++;
})

//READ
app.get('/:id', function (req, res) {
    var id = req.params.id;

    if(typeof listCustomers[id] == 'undefined') {
        res.end("Customer no existe, id = " + id);
        return;
    }

    var user = listCustomers[id];
    console.log(JSON.stringify(user));
    res.end(JSON.stringify(user));

})

//UPDATE
app.put('/update/:id', function (req, res) {
    if(Utils.checkFields(req, res) == 1) {
        return;
    }

    var id = req.params.id;
    if(typeof listCustomers[id] == 'undefined') {
        res.end("Customer no existe, id = " + id);
        return;
    }

    var name = req.body.name;
    var password = req.body.password;
    updateCustomer = Utils.createCustomer(name, password);

    listCustomers[id] = updateCustomer;

    console.log(JSON.stringify(listCustomers));
    res.end("Customer actualizado con exito, id = " + id);
})


//DELETE
app.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    delete listCustomers[id];
    console.log(JSON.stringify(listCustomers));
    res.end(JSON.stringify(listCustomers));
})

//Aniadir credito (si "credit" es numero negativo se quitaria credito)
app.put('/addCredit/:id', function (req, res) {
    if(Utils.checkCredit(req, res) == 1) {
        return;
    }

    var id = req.params.id;
    if(typeof listCustomers[id] == 'undefined') {
        res.end("Customer no existe, id = " + id);
        return;
    }

    listCustomers[id].credit+= req.body.credit;

    console.log(JSON.stringify(listCustomers));
    res.end("Customer actualizado con exito, nuevo credito = " + listCustomers[id].credit);
})

/*
 + --> orden ascendente
 - --> orden descendente
 */
app.get('/sort/:order', function (req, res) {
    var order = req.params.order;

    if(order != "+" && order != "-" ){
        res.end("Criterio " + order + " no aceptable. Los criterios aceptados son '+' o '-'.");
        return;
    }
    var arrayOrdered = Object.keys(listCustomers).map(function (key) {
        return listCustomers[key];
    })
        .sort(function(a,b) {
            if(order == "+") {
                return a.credit - b.credit;
            } else if(order == "-") {
                return b.credit - a.credit;
            } else {
                return;
            }
        });

    console.log(JSON.stringify(arrayOrdered));
    res.end(JSON.stringify(arrayOrdered));

})

