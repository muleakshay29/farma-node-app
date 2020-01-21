const mongoos = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

/* const CommonMaster = mongoos.model("frm_common_master", {
  CM_Name: {
    type: String,
    required: true,
    trim: true
  }
}); */

const commonMasterSchema = new mongoos.Schema({
  CM_Name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true
  }
});

commonMasterSchema.plugin(uniqueValidator);

const CommonMaster = mongoos.model(
  "frm_common_master",
  commonMasterSchema,
  "frm_common_master"
);

module.exports = CommonMaster;
