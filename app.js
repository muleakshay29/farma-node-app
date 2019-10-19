const express = require("express");
const cors = require("cors");
require("./src/db/mongoos");

const supplierRouter = require("./src/routers/frm-supplier-master");
const commonMasterRouter = require("./src/routers/frm-common-master");
const authentication = require("./src/routers/frm_authentication");
const commonMasterChildRouter = require("./src/routers/frm-common-master-child");
const accountTransaction = require("./src/routers/frm-transactions");
const employeeMaster = require("./src/routers/frm-employee-master");
const productMaster = require("./src/routers/frm-product-master");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(supplierRouter);
app.use(commonMasterRouter);
app.use(commonMasterChildRouter);
app.use(authentication);
app.use(accountTransaction);
app.use(employeeMaster);
app.use(productMaster);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
