const mongoos = require("mongoose");
const bcrypt = require("bcryptjs");

// const Registration = mongoos.model("frm_registration", {
const userSchema = new mongoos.Schema({
  R_code: {
    type: String,
    required: true,
    trim: true
  },
  R_BusinessName: {
    type: String,
    required: true
  },
  R_UserName: {
    type: String,
    // unique: true,
    required: true
  },
  R_EmailId: {
    type: String,
    required: true
  },
  R_Password: {
    type: String,
    required: true
  },
  R_TypeOfUse: {
    type: String,
    required: true
  },
  R_BizType: {
    type: String,
    required: true
  },
  R_IsActive: {
    type: String,
    required: true
  },
  R_UserType: {
    type: String,
    required: true
  }
});

// Hash the plain text R_Password before saving
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("R_Password")) {
    user.R_Password = await bcrypt.hash(user.R_Password, 8);
  }

  next();
});

userSchema.statics.findByCredentials = async (R_UserName, R_Password) => {
  const user = await Registration.findOne({ R_UserName });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(R_Password, user.R_Password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const Registration = mongoos.model("frm_registration", userSchema);
module.exports = Registration;
