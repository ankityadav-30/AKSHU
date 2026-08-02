// APP/server/repositories/lead.repository.js

import Lead from "../models/lead.model.js";

export const createLead = async (leadData) => {
  return await Lead.create(leadData);
};

export const findLeadById = async (id) => {
  return await Lead.findById(id);
};

export const listLeads = async ({ search, status, limit = 50, skip = 0 }) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { projectType: { $regex: search, $options: "i" } },
    ];
  }

  const [leads, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Lead.countDocuments(query),
  ]);

  return { leads, total };
};

export const updateLeadStatus = async (id, status, note = "") => {
  const updateObj = { status };
  if (note) {
    updateObj.$push = { notes: { content: note } };
  }
  return await Lead.findByIdAndUpdate(id, updateObj, { new: true });
};

export const deleteLead = async (id) => {
  return await Lead.findByIdAndDelete(id);
};
