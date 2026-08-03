// APP/server/controllers/lead.controller.js

import {
  createLead,
  listLeads,
  updateLeadStatus,
  deleteLead,
  findLeadById,
} from "../repositories/lead.repository.js";
import { findBySessionId } from "../repositories/chatSession.repository.js";

/**
 * Public/Bot: Capture a new business lead
 * POST /api/v1/leads
 */
export const postCreateLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description,
      sessionId,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required to submit lead information",
      });
    }

    const lead = await createLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      company: company ? company.trim() : "",
      projectType: projectType || "Custom Software",
      budget: budget || "Not Specified",
      timeline: timeline || "Flexible",
      description: description ? description.trim() : "",
      sessionId: sessionId || "",
      source: "AKSHU AI Chatbot",
    });

    if (sessionId) {
      // Update session status to lead_captured
      const session = await findBySessionId(sessionId);
      if (session) {
        session.status = "lead_captured";
        session.visitorInfo = { name, email, phone, company };
        await session.save();
      }
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! Your project requirements have been submitted successfully. An AKSHU technical expert will review your request and get back to you shortly.",
      data: lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error creating lead",
    });
  }
};

/**
 * Admin: List captured leads
 * GET /api/v1/leads
 */
export const getAdminLeads = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const { leads, total } = await listLeads({
      search,
      status,
      limit: parseInt(limit, 10),
      skip,
    });

    return res.status(200).json({
      success: true,
      data: {
        leads,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching leads list",
    });
  }
};

/**
 * Admin: Update lead status
 * PATCH /api/v1/leads/:id
 */
export const patchAdminLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const updated = await updateLeadStatus(id, status, note);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Lead record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating lead status",
    });
  }
};

/**
 * Admin: Delete lead
 * DELETE /api/v1/leads/:id
 */
export const removeAdminLead = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteLead(id);
    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting lead record",
    });
  }
};

/**
 * Admin: Export leads to CSV
 * GET /api/v1/leads/export
 */
export const exportLeadsCsv = async (req, res) => {
  try {
    const { leads } = await listLeads({ limit: 1000, skip: 0 });

    let csv = "Name,Email,Phone,Company,Project Type,Budget,Timeline,Status,Source,Date\n";
    leads.forEach((l) => {
      const date = l.createdAt ? new Date(l.createdAt).toISOString().split("T")[0] : "";
      csv += `"${l.name}","${l.email}","${l.phone || ""}","${l.company || ""}","${l.projectType || ""}","${l.budget || ""}","${l.timeline || ""}","${l.status}","${l.source}","${date}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=akshu_leads.csv");
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error exporting leads CSV",
    });
  }
};
