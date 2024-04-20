const Lead = require("../models/Leads");

async function addLead({ phone, fio, problem }) {
  const result = await Lead.create({ phone, fio, problem });
  return result;
}

async function getLeads() {
  const result = await Lead.find();
  return result;
}

async function deleteLead(id) {
  await Lead.findByIdAndDelete(id);
}

module.exports = { addLead, getLeads, deleteLead };
