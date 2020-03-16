const mongoos = require("mongoose");

const Supplier = mongoos.model("frm_supplier_master", {
  /* SUP_code: {
    type: String,
    required: true,
    trim: true
  }, */
  SUP_CompanyName: {
    type: String,
    required: true,
    trim: true
  },
  SUP_Address: {
    type: String,
    required: false,
    trim: true
  },
  SUP_ContactNumber1: {
    type: Number,
    required: true,
    trim: true
  },
  SUP_ContactNumber2: {
    type: Number,
    required: true,
    trim: true
  },
  SUP_OwnerName: {
    type: String,
    required: true,
    trim: true
  },
  SUP_GSTNumber: {
    type: String,
    required: true,
    trim: true
  },
  SUP_DrNo: {
    type: String,
    required: true,
    trim: true
  },
  SUP_PanNo: {
    type: String,
    required: false,
    trim: true
  },
  SUP_BizMailId: {
    type: String,
    required: true,
    trim: true
  },
  SUP_WhatsappNumber: {
    type: String,
    required: true,
    trim: true
  },
  SUP_Dist: {
    type: String,
    required: false,
    trim: true
  },
  SUP_City: {
    type: String,
    required: false,
    trim: true
  },
  SUP_Pin: {
    type: Number,
    required: false,
    trim: true
  },
  SUP_State: {
    type: String,
    required: false,
    trim: true
  }
});

module.exports = Supplier;
