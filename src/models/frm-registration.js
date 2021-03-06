const mongoos = require("mongoose");
const bcrypt = require("bcryptjs");

// const Registration = mongoos.model("frm_registration", {
const userSchema = new mongoos.Schema({
  R_BusinessName: {
    type: String,
    required: true,
    trim: true
  },
  R_UserName: {},
  R_EmailId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  R_Password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    }
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
    type: Number,
    required: true
  },
  R_UserType: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
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
