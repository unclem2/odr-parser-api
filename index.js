const { parse } = require('./replayParser.js');
const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



app.post('/', async function(req, res) {
  //let odrstats = req.body;
  //let player = odrstats['player'];
  let odrfile = req.body;
  //let pasteid = odrstats['file'];
  let b64odr = Buffer.from(odrfile.odr, 'base64');
  let analyzed_data = await parse(b64odr)
  console.log(analyzed_data)
  request.post('https://droidmulti.yoshiinori.repl.co/score/', {
    form: {
      username: analyzed_data.player_name,
      score: analyzed_data.score
    }
  })
});



app.listen(3000);
