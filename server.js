const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/dashboard-smartmarket'));

app.get('/*', function(req, res){

  res.sendFile(__dirname + '/dist/dashboard-smartmarket/index.html');

});

app.listen(4200);
