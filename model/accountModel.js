import mongoose, { Schema } from "mongoose";
const accountSchema = new Schema({
  username: String,
  password: String,
  full_name: String,
  birthday: Date,
  address: String,
});
const accountModel = mongoose.model("accounts", accountSchema);
export default accountModel;
