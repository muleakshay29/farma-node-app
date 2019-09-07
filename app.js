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

const Supplier = require("./src/models/frm-supplier-master");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/add-suppliers", (req, res) => {
  const supplier = new Supplier(req.body);
  supplier
    .save()
    .then(() => {
      res.status(201).send(supplier);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/fetch-suppliers", (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.send(suppliers);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

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

app.post("/checkcategory", (req, res) => {
  Category.find({ Category_name: req.body.Category_name })
    .then(categories => {
      res.send(categories);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.post("/expense", (req, res) => {
  const expense = new Expense(req.body);
  expense
    .save()
    .then(() => {
      res.status(201).send(expense);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/expense", (req, res) => {
  Expense.find({})
    .then(expenseList => {
      res.send(expenseList);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/expense/:startDate", (req, res) => {
  const startDate = req.params.startDate;
  const tempArr = startDate.split("-");
  const lastDay = new Date(tempArr[0], tempArr[1], 0).getDate();
  const endDate = `${tempArr[0]}-${tempArr[1]}-${lastDay}`;

  Expense.find({ Transaction_date: { $gte: startDate, $lte: endDate } })
    .then(expenseList => {
      res.send(expenseList);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/expense-details/:id", (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  Expense.findById(_id)
    .then(expense => {
      if (!expense) {
        return res.status(404).send();
      }

      res.status(200).send(expense);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
