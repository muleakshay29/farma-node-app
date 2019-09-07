const mongoos = require("mongoose");

const Expense = mongoos.model("Expense", {
  Transaction_date: {
    type: Date,
    required: true,
    trim: true
  },
  Description: {
    type: String,
    required: true,
    trim: true
  },
  Amount: {
    type: Number,
    required: true,
    trim: true
  },
  IncomeExpense_flag: {
    type: Number,
    required: true,
    trim: true
  },
  Category_id: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = Expense;
