const mongoos = require("mongoose");

const schemesSchema = new mongoos.Schema({
  PRO_ID: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "frm_product_masters",
    required: true,
    trim: true
  },
  Quantity: {
    type: Number,
    required: true,
    trim: true
  },
  Free_Quantity: {
    type: Number,
    trim: true
  }
});

const Scheme = mongoos.model("frm_schemes", schemesSchema, "frm_schemes");

module.exports = Scheme;
