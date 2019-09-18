const mongoos = require("mongoose");

const CommonMaster = mongoos.model("frm_common_master", {
  CM_Name: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = CommonMaster;
