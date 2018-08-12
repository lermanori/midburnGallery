// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();
var fs = require('fs');
// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://' + host + ':' + port);
}
// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('Public'));
app.get('/testing/:value',on_search);
function on_search(req,res)
{
  var params = req.params;
   var pathToJson = mapToFile(params);
  var jsonImagesInfo = fs.readFileSync(pathToJson);
  res.send(jsonImagesInfo);
}
//logic should be changed to a diffrent component (file etc)
function mapToFile(params)
{
var value = params.value;
var returnValue;
switch (value) {
  case 'sorted':
    returnValue = "midburnPhotos//ImageInfoSortedByColor.JSON";
    break;
    case 'unsorted':
    returnValue ="midburnPhotos//ImageInfo.json";
    break;
  default:
    returnValue = "midburnPhotos//ImageInfoSortedByColor.JSON";
    break;
}
return returnValue;
}
