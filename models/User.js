import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Ajoute d'autres champs si besoin
});

const User = mongoose.model("User", userSchema);

export default User;
