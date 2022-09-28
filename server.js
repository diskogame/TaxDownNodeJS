var express = require('express'); //Node.js web application framework
var app = express();
var fs = require("fs");
var listCustomers;


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

var customer = {
    "4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
    }
}
//CREATE
app.post('/add', function (req, res) {
    listCustomers[SEQ_CUSTOMERS] = customer["4"];
    console.log(JSON.stringify(listCustomers));
    res.end("Customer añadido con exito, id = " + SEQ_CUSTOMERS);
    SEQ_CUSTOMERS++;
})
//READ
app.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = listCustomers[id];
    console.log(JSON.stringify(user));
    res.end(JSON.stringify(user));

})
//UPDATE
app.put('/update/:id', function (req, res) {
    var id = req.params.id;
    listCustomers[id] = customer["4"];
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