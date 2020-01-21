const mongoos = require("mongoose");

const commonMasterSchema = new mongoos.Schema({
  CM_Name: {
    type: String,
    required: true,
    trim: true
  }
});

const CommonMaster = mongoos.model(
  "frm_common_master",
  commonMasterSchema,
  "frm_common_master"
);

module.exports = CommonMaster;
