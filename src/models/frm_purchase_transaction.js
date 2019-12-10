const mongoos = require("mongoose");

const pTransactionSchema = new mongoos.Schema({
  InvoiceDate: {
    type: Date,
    required: true,
    trim: true,
    default: Date.now
  },
  PurchaseFlag: {
    type: Number,
    required: true,
    trim: true,
    default: 1
  },
  /* PurchaseSchemeTrans: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    trim: true
  }, */
  SubTotal_Amount: {
    type: Number,
    trim: true,
    default: 0
  },
  CGST_Amount: {
    type: Number,
    trim: true,
    default: 0
  },
  SGST_Amoint: {
    type: Number,
    trim: true,
    default: 0
  },
  Total_Amount: {
    type: Number,
    trim: true,
    default: 0
  }
});

const transactionChildSchema = new mongoos.Schema({
  InvoiceDate: {
    type: Date,
    required: true,
    trim: true,
    default: Date.now
  },
  PurchaseTransId: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  Product_id: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  Product_Name: {
    type: String,
    required: true,
    trim: true
  },
  Product_Scheme: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  Product_Quantity: {
    type: Number,
    required: true,
    trim: true
  },
  Product_Free_Quantity: {
    type: Number,
    required: true,
    trim: true
  }
});

const PurchaseTrans = mongoos.model(
  "frm_purchase_transaction",
  pTransactionSchema,
  "frm_purchase_transaction"
);

const TransactionChild = mongoos.model(
  "frm_purchase_transaction_child",
  transactionChildSchema,
  "frm_purchase_transaction_child"
);

module.exports = { PurchaseTrans, TransactionChild };
