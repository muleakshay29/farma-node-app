const express = require("express");
const cors = require("cors");
require("./src/db/mongoos");

const supplierRouter = require("./src/routers/frm-supplier-master");
const commonMasterRouter = require("./src/routers/frm-common-master");
const registration = require("./src/routers/frm-registration");
const commonMasterChildRouter = require("./src/routers/frm-common-master-child");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(supplierRouter);
app.use(commonMasterRouter);
app.use(commonMasterChildRouter);
app.use(registration);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
