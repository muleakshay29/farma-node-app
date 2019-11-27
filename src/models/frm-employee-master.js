const mongoos = require("mongoose");

const empSchema = new mongoos.Schema({
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
    type: mongoos.Schema.Types.ObjectId,
    ref: "frm_common_master_child",
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

const EmployeeMaster = mongoos.model(
  "frm_employee_master",
  empSchema,
  "frm_employee_master"
);

module.exports = EmployeeMaster;
