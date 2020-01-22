const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
require("./src/db/mongoos");

const supplierRouter = require("./src/routers/frm-supplier-master");
const commonMasterRouter = require("./src/routers/frm-common-master");
const authentication = require("./src/routers/frm_authentication");
const commonMasterChildRouter = require("./src/routers/frm-common-master-child");
const accountTransaction = require("./src/routers/frm-transactions");
const employeeMaster = require("./src/routers/frm-employee-master");
const productMaster = require("./src/routers/frm-product-master");
const bizProduct = require("./src/routers/frm-biz-product");
const scheme = require("./src/routers/frm_scheme");
const transactions = require("./src/routers/frm_purchase_transaction");
const imageUpload = require("./src/routers/frm_image_upload");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(supplierRouter);
app.use(commonMasterRouter);
app.use(commonMasterChildRouter);
app.use(authentication);
app.use(accountTransaction);
app.use(employeeMaster);
app.use(productMaster);
app.use(bizProduct);
app.use(scheme);
app.use(transactions);
app.use(imageUpload);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
