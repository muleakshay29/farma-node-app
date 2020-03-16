const mongoos = require("mongoose");

const stockSchema = new mongoos.Schema({
  Invoice_no: {
    type: String,
    required: true,
    trim: true
  },
  PRO_ID: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "frm_product_masters",
    required: true,
    trim: true
  },
  PRO_Batch: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Expiry: {
    type: Date,
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

/* const stockSchema = new mongoos.Schema({
  P_SrNo: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  P_InvoiceNo: {
    type: Number,
    required: true,
    trim: true
  },
  P_Date: {
    type: Date,
    required: true,
    trim: true
  },
  P_From: {
    type: Number,
    required: true,
    trim: true
  },
  P_IsTaxable: {
    type: Number,
    required: true,
    trim: true
  },
  P_Total_Taxable_Amt: {
    type: Number,
    required: true,
    trim: true
  },
  P_GST: {
    type: Number,
    trim: true
  },
  P_Invoice_Amt: {
    type: Number,
    trim: true
  },
  P_Taxable_Amt_0: {
    type: Number,
    trim: true
  },
  P_SGST_0: {
    type: Number,
    trim: true
  },
  P_CGST_0: {
    type: Number,
    trim: true
  },
  P_IGST_0: {
    type: Number,
    trim: true
  },
  P_Taxable_Amt_5: {
    type: Number,
    trim: true
  },
  P_SGST_5: {
    type: Number,
    trim: true
  },
  P_CGST_5: {
    type: Number,
    trim: true
  },
  P_IGST_5: {
    type: Number,
    trim: true
  },
  P_Taxable_Amt_12: {
    type: Number,
    trim: true
  },
  P_SGST_12: {
    type: Number,
    trim: true
  },
  P_CGST_12: {
    type: Number,
    trim: true
  },
  P_IGST_12: {
    type: Number,
    trim: true
  },
  P_Taxable_Amt_18: {
    type: Number,
    trim: true
  },
  P_SGST_18: {
    type: Number,
    trim: true
  },
  P_CGST_18: {
    type: Number,
    trim: true
  },
  P_IGST_18: {
    type: Number,
    trim: true
  },
  P_Taxable_Amt_28: {
    type: Number,
    trim: true
  },
  P_SGST_28: {
    type: Number,
    trim: true
  },
  P_CGST_28: {
    type: Number,
    trim: true
  },
  P_IGST_28: {
    type: Number,
    trim: true
  }
}); */

const StockTrans = mongoos.model(
  "frm_stock_transaction",
  stockSchema,
  "frm_stock_transaction"
);

module.exports = StockTrans;
