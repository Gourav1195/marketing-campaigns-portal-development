"use strict";
/*import { Request, Response } from "express";
import Campaign from "../models/Campaign";
// import kafkaProducer from "../config/kafka1";
import ActivityLog from "../models/ActivityLog";

// Log User Activity
const logActivity = async (userId: string, action: string, status: string, message: string) => {
    await ActivityLog.create({ user: userId, action, status, message });
  };

// Create Campaign (with Activity Log)
export const createCampaign = async (req: Request, res: Response) => {
    try {
      const campaign = new Campaign(req.body);
      await campaign.save();
      await logActivity((req as any).user.id, "Create Campaign", "success", `Campaign '${campaign.name}' created.`);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof Error) {
        await logActivity((req as any).user.id, "Create Campaign", "error", error.message);
      } else {
        await logActivity((req as any).user.id, "Create Campaign", "error", "Unknown error occurred");
      }
    }
  };

// Get All Campaigns
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

// Update Campaign
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Error updating campaign", error });
  }
};

// Delete Campaign
export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};

// // Trigger Real-Time Campaign
// export const triggerCampaign = async (req: Request, res: Response) => {
//     try {
//       const { event, data } = req.body;
//       kafkaProducer.send([{ topic: "real-time-campaigns", messages: JSON.stringify({ event, data }) }], (err) => {
//         if (err) return res.status(500).json({ message: "Kafka error", err });
//         res.status(200).json({ message: "Real-time campaign triggered successfully" });
//       });
//     } catch (error) {
//       res.status(500).json({ message: "Triggering failed", error });
//     }
//   };*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.launchCampaign = exports.getCampaigns = exports.duplicateCampaign = exports.toggleCampaignStatus = exports.editCampaign = exports.createOrUpdateCampaign = exports.getCampaignList = void 0;
const Campaign_1 = __importDefault(require("../models/Campaign")); // ✅ Import `ICampaign`
// ✅ Get Campaign List with Filters
const getCampaignList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, status, type, startDate, endDate, sortBy, order, page = 1, limit = 10 } = req.query;
        let query = {};
        // ✅ Search by campaign name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        // ✅ Filter by Status
        if (status) {
            query.status = status;
        }
        // ✅ Filter by Type
        if (type) {
            query.type = type;
        }
        // ✅ Filter by Date Range
        if (startDate && endDate) {
            query.publishedDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }
        // ✅ Pagination & Sorting
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;
        const campaigns = yield Campaign_1.default.find(query)
            .sort({ [sortBy]: order === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(pageSize);
        // ✅ Get Total Count for Pagination
        const totalCount = yield Campaign_1.default.countDocuments(query);
        res.status(200).json({
            success: true,
            data: campaigns,
            pagination: {
                total: totalCount,
                page: pageNumber,
                limit: pageSize,
            },
        });
    }
    catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCampaignList = getCampaignList;
// ✅ Create or Update a Campaign
const createOrUpdateCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, audience, template, schedule, status } = req.body;
        if (!name || !type || !audience || !template || !schedule) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newCampaign = new Campaign_1.default({
            name,
            type,
            audience,
            template,
            schedule,
            status: status || "Draft",
        });
        yield newCampaign.save();
        res.status(201).json({ message: "Campaign Saved Successfully", campaign: newCampaign });
    }
    catch (error) {
        console.error("Error saving campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createOrUpdateCampaign = createOrUpdateCampaign;
// ✅ Edit a Campaign
const editCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const updatedData = req.body;
        const campaign = yield Campaign_1.default.findByIdAndUpdate(campaignId, updatedData, { new: true });
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({ message: "Campaign Updated Successfully", campaign });
    }
    catch (error) {
        console.error("Error updating campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.editCampaign = editCampaign;
// ✅ Pause/Resume Campaign
const toggleCampaignStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaign = yield Campaign_1.default.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        // ✅ Toggle between 'Paused' and 'Active'
        const newStatus = campaign.status === "Active" ? "Paused" : "Active";
        // ✅ Update only `status` field without triggering required validation
        yield Campaign_1.default.updateOne({ _id: campaignId }, { $set: { status: newStatus } });
        res.status(200).json({ message: `Campaign ${newStatus} Successfully`, newStatus });
    }
    catch (error) {
        console.error("Error updating campaign status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.toggleCampaignStatus = toggleCampaignStatus;
// ✅ Duplicate a Campaign
const duplicateCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const originalCampaign = yield Campaign_1.default.findById(campaignId);
        if (!originalCampaign) {
            return res.status(404).json({ message: "Original campaign not found" });
        }
        // ✅ Convert to a plain object and remove `_id`
        const campaignData = originalCampaign.toObject();
        delete campaignData._id; // Remove _id to create a new entry
        // ✅ Set new name, createdAt, and publishedDate
        campaignData.name = `Copy of ${originalCampaign.name}`;
        campaignData.createdAt = new Date();
        campaignData.publishedDate = new Date(); // ✅ Set a new valid publishedDate
        campaignData.status = "Draft"; // Start as Draft
        const duplicatedCampaign = new Campaign_1.default(campaignData);
        yield duplicatedCampaign.save();
        res.status(201).json({ message: "Campaign Duplicated Successfully", campaign: duplicatedCampaign });
    }
    catch (error) {
        console.error("Error duplicating campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.duplicateCampaign = duplicateCampaign;
// ✅ Get All Campaigns
const getCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaigns = yield Campaign_1.default.find().populate("audience template");
        res.status(200).json(campaigns);
    }
    catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCampaigns = getCampaigns;
// ✅ Launch a Campaign
const launchCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaign = yield Campaign_1.default.findByIdAndUpdate(campaignId, { status: "Active" }, { new: true });
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({ message: "Campaign Launched Successfully", campaign });
    }
    catch (error) {
        console.error("Error launching campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.launchCampaign = launchCampaign;
// ✅ Delete a Campaign
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId } = req.params;
        const campaign = yield Campaign_1.default.findByIdAndDelete(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({ message: "Campaign deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting campaign:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteCampaign = deleteCampaign;
