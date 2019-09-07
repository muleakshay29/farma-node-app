const mongoos = require("mongoose");

const Category = mongoos.model("Category", {
  Category_name: {
    type: String,
    required: true,
    trim: true
  },
  Category_icon: {
    type: String,
    required: false,
    trim: true
  }
});

module.exports = Category;
