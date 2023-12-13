// create web server for comments
// 1. create web server
// 2. open file
// 3. read file
// 4. send file to client
// 5. close file
// 6. close web server

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  fs.readFile('./comments.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(3000, function() {
  console.log('Server running at http://localhost:3000');
});