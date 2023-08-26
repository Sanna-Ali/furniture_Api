const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String },
    //		role: { type: String, enum: [ 'user', 'admin', 'seller', 'dealer' ], default: 'user' },

    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    // profilephoto: {
    //     type: Object,
    //     default: {
    //         url: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
    //         publicId: null,
    //     }
    //  },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    // isAccountVerified: {
    //     type: Boolean,
    //     default: false
    // },
    // posts: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'post'
    //     }
    // ]
  },
  { timestamps: true }
);
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

const User = mongoose.model("User", userSchema);

const userRegisterValidation = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100).required(),
    firstname: joi.string().trim().min(2).max(100).required(),
    lastname: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(5).max(100).email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
};

const userLoginValidation = (obj) => {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).email(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
};

const userUpdateValidation = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(2).max(100),
    password: joi.string().trim().min(8),
    bio: joi.string(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  userRegisterValidation,
  userLoginValidation,
  userUpdateValidation,
};
// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     storeLocation: {
//       type: String,
//     },
//     imageURL: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("user", userSchema);
