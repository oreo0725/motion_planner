var express = require('express');
var {getMapData, read} = require('./src/data')

var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html", function (err) {
        if (err) res.send(404);
    });
})
app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt)/i, function (req, res) {
    res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function (err) {
        if (err) res.send(404);
    });
});

app.get("/elements", function(req, res) {
    res.json(getMapData())
});

app.get("/read/:elem", function(req, res) {
    res.send(read(req.params.elem))
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on " + port);
    console.log("http://localhost:" + port);
});
