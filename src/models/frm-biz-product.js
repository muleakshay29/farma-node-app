const mongoos = require("mongoose");

const bixProductSchema = new mongoos.Schema({
  PRO_code: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Name: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Barcode: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Manufraturer: {
    type: String,
    required: true,
    trim: true
  },
  PRO_SGST: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_CGST: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_IGST: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_Price: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_CESS: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_HSN: {
    type: String,
    required: true,
    trim: true
  },
  PRO_ScheduledUnder: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Content: {
    type: String,
    required: true,
    trim: true
  },
  PRO_ReorderLevel: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_Minimum_stock: {
    type: Number,
    required: true,
    trim: true
  },
  PRO_Type: {
    type: String,
    required: true,
    trim: true
  },
  PRO_Image: {
    type: Buffer,
    required: true,
    trim: true
  },
  Created_by: {
    type: String,
    trim: true
  },
  Created_date: {
    type: Date,
    required: true,
    trim: true,
    default: Date.now
  },
  Updated_by: {
    type: String,
    trim: true
  },
  Updated_date: {
    type: Date,
    trim: true
  },
  Active_flag: {
    type: Number,
    required: true,
    trim: true,
    default: 1
  },
  Deleted_by: {
    type: String,
    trim: true
  },
  Deleted_date: {
    type: Date,
    trim: true
  },
  Company_id: {
    type: Number,
    trim: true
  },
  Year_id: {
    type: String,
    trim: true
  }
});

const BizProduct = mongoos.model(
  "frm_biz_product",
  bixProductSchema,
  "frm_biz_product"
);

module.exports = BizProduct;
