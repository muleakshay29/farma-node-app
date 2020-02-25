const mongoos = require("mongoose");

const stockSchema = new mongoos.Schema({
  PRO_ID: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "frm_product_masters",
    required: true,
    trim: true
  },
  PRO_Barcode: {
    type: String,
    trim: true
  },
  PRO_Batch: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Purchase_Unit: {
    type: Number,
    trim: true
  },
  PRO_Purchase_QTY: {
    type: Number,
    trim: true
  },
  PRO_Sales_Unit: {
    type: Number,
    trim: true
  },
  PRO_Sales_QTY: {
    type: Number,
    trim: true
  },
  Date: {
    type: Date,
    default: Date.now
  },
  Stock_Type: {
    type: String,
    trim: true
  },
  From_To: {
    type: String,
    trim: true
  },
  Company_id: {
    type: String,
    trim: true
  },
  Year_id: {
    type: String,
    trim: true
  }
});

const StockTrans = mongoos.model(
  "frm_stock_transaction",
  stockSchema,
  "frm_stock_transaction"
);

module.exports = StockTrans;
