/* var http = require("http");
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
}); */

const express = require("express");
const cors = require("cors");
require("./src/db/mongoos");
const Category = require("./src/models/category");
const Expense = require("./src/models/expense");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/category", (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then(() => {
      res.status(201).send(category);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/category", (req, res) => {
  Category.find({})
    .then(categories => {
      res.send(categories);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
