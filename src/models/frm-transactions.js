const mongoos = require("mongoose");

const AccountTransaction = mongoos.model("frm_account_masters", {
  AC_name: {
    type: String,
    required: true,
    trim: true
  },
  AC_no: {
    type: Number,
    required: true,
    trim: true
  },
  IFSC_code: {
    type: String,
    required: true,
    trim: true
  },
  AC_type: {
    type: String,
    required: true,
    trim: true
  },
  Bank_name: {
    type: String,
    required: true,
    trim: true
  },
  AC_opening_bal: {
    type: Number,
    required: true,
    trim: true
  },
  Opening_bal_type: {
    type: String,
    required: true,
    trim: true
  },
  Created_by: {
    type: String,
    required: true,
    trim: true
  },
  Created_date: {
    type: Date,
    required: true,
    trim: true
  },
  Company_id: {
    type: String,
    required: true,
    trim: true
  },
  Year_id: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = AccountTransaction;
