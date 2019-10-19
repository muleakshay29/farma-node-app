const mongoos = require("mongoose");

/* const CommonMasterChild = mongoos.model("frm_common_master_child", {
  CM_id: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "frm_common_master",
    required: true,
    trim: true
  },
  CMC_Name: {
    type: String,
    required: true,
    trim: true
  }
}); */

const masterChildSchema = new mongoos.Schema({
  CM_id: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "commonmaster",
    required: true,
    trim: true
  },
  CMC_Name: {
    type: String,
    required: true,
    trim: true
  }
});

const CommonMasterChild = mongoos.model(
  "frm_common_master_child",
  masterChildSchema,
  "frm_common_master_child"
);

module.exports = CommonMasterChild;
