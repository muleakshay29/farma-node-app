var http = require("http");
const port = process.env.PORT || 3000;
var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write("This is Test Message.");
  response.end();
});
server.listen(port, () => {
  console.log("Server is up on port " + port);
});
