const mongoos = require("mongoose");

const EmployeeMaster = mongoos.model("frm_employee_master", {
  Emp_code: {
    type: String,
    required: true,
    trim: true
  },
  Emp_name: {
    type: String,
    required: true,
    trim: true
  },
  Emp_address: {
    type: String,
    required: true,
    trim: true
  },
  Emp_city: {
    type: String,
    required: true,
    trim: true
  },
  Emp_state: {
    type: String,
    required: true,
    trim: true
  },
  Emp_adhar: {
    type: Number,
    required: true,
    trim: true
  },
  Emp_pan: {
    type: String,
    required: true,
    trim: true
  },
  User_name: {
    type: String,
    required: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    trim: true
  },
  Email_id: {
    type: String,
    required: true,
    trim: true
  },
  Mobile_no: {
    type: Number,
    required: true,
    trim: true
  },
  Type_of_user: {
    type: Number,
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
  Updated_by: {
    type: String,
    required: true,
    trim: true
  },
  Updated_date: {
    type: Date,
    required: true,
    trim: true
  },
  Active_flag: {
    type: Number,
    required: true,
    trim: true
  },
  Deleted_by: {
    type: String,
    required: true,
    trim: true
  },
  Deleted_date: {
    type: Date,
    required: true,
    trim: true
  },
  Company_id: {
    type: Number,
    required: true,
    trim: true
  },
  Year_id: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = EmployeeMaster;
