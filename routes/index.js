var express = require('express');
var router = express.Router();

const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function(req, res, next) {

  fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    
    data["India"].forEach(({ date, confirmed, recovered, deaths }) =>
    //console.log
                (`${date} 
                 confirmed: ${confirmed}
                 recovered: ${recovered}
                 deaths: ${deaths}
                 active cases: ${confirmed - recovered - deaths}`)
                )
    var parsedCoronaData = data["India"];
    var len = data["India"].length;
    var confirmed = JSON.stringify(parsedCoronaData[len-1].confirmed);
    var recovered = JSON.stringify(parsedCoronaData[len-1].recovered);
    var deaths = JSON.stringify(parsedCoronaData[len-1].deaths);
    var active = (JSON.stringify(parsedCoronaData[len-1].confirmed))-(JSON.stringify(parsedCoronaData[len-1].deaths))-(JSON.stringify(parsedCoronaData[len-1].deaths));
    
    res.render('index',{ confirmed: confirmed, recovered: recovered, deaths: deaths, active: active} );
  });
});

module.exports = router;
