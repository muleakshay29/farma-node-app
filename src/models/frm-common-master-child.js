const mongoos = require("mongoose");

const CommonMasterChild = mongoos.model("frm_common_master_child", {
  CM_id: {
    type: String,
    required: true,
    trim: true
  },
  CMC_Name: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = CommonMasterChild;
