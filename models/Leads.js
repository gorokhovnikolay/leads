const mongoose = require("mongoose");

const LeadShema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  fio: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    default: String(new Date().toISOString()).replace("T", " ").slice(0, 16),
  },
});
const Lead = mongoose.model("Lead", LeadShema);
module.exports = Lead;
