const { Schema, model } = require("mongoose");

const promptSchema = new Schema({
  role: { type: String, default: "user" },
  content: { type: String, default: " " },
  responseMessage: {type: String, default: " "}
},{
    timestamps:true
});

module.exports = model("Prompt", promptSchema);
