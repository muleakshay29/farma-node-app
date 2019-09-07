const mongoos = require("mongoose");
const connURL =
  "mongodb+srv://muleakshay29:2CmHiqHX2DX3z8vt@cluster0-zkaxy.mongodb.net/farma-app?retryWrites=true&w=majority";
// const connURL = "mongodb://127.0.0.1:27017/expense-manager-api":

mongoos.connect(connURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
