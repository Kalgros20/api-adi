var app = require('./config/Express')();
var http = require('http').Server(app);
var db = require('./infra/ConnectionString');
var xml = require('xml');


http.listen(8000, function () {
    console.log("Servidor Rodando");
});

app.get("/", function (req, res) {
    res.json({ message: "Essa é a home da api" });
});

app.get("/carrosjson", function (req, res) {
    var listaDeCarros = []
    db.query("SELECT * FROM carro", function (err, result, fields) {
        res.send({ result });

    });
});

app.get("/carrostexto", function (req, res) {
    db.query("SELECT * FROM carro", function (err, result, fields) {
        res.json(JSON.stringify(result));
    });
});

app.get("/carrosxml", function (req, res) {
    var listaDeCarros = []
    db.query("SELECT * FROM carro", function (err, result) {
        res.set('Content-Type', 'text/xml');
        res.send(xml([{ result }]));
    });

});

app.get("/carros/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM carro where id = ?", id, function (err, result, fields) {
        res.send({ result });
    });
});

app.post("/carros", function (req, res) {
    var body = req.body;
    var valores = [
        [body.nome, body.descricao, body.url_foto, body.url_video, body.latitude, body.longitude, body.tipo]
    ]
    console.log(valores);
    var sql = "INSERT INTO carro (nome, descricao,url_foto,url_video,latitude,longitude,tipo) VALUES ?";
    db.query(sql, [valores], function (err, result) {
        console.log("Number of records inserted: " + result.affectedRows);
        res.send({ message: "DADOS INSERIDO COM SUCESSO" });
    });
});

app.delete("/carros/:id", function (req, res) {
    var id = req.params.id;
    id = parseInt(id);
    console.log(id);
    db.query("DELETE FROM carro where id = ?", id, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        res.send({ message: "CARRO DELETADO COM SUCESSO!" });
    });
});


