// var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

// var UserSchema = new mongoose.Schema({
// 	name:String,
//     email: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
