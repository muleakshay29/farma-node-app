const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticationSchema = new mongoose.Schema({
  R_BusinessName: {
    type: String,
    required: true,
    trim: true
  },
  R_UserName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  R_EmailId: {
    type: String,
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
    default: 1,
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

authenticationSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "P@ssword!123");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

authenticationSchema.statics.findByCredentials = async (
  R_UserName,
  R_Password
) => {
  const user = await Authentication.findOne({ R_UserName });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(R_Password, user.R_Password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

authenticationSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("R_Password")) {
    user.R_Password = await bcrypt.hash(user.R_Password, 8);
  }

  next();
});

const Authentication = mongoose.model(
  "frm_registration",
  authenticationSchema,
  "frm_registration"
);

module.exports = Authentication;
