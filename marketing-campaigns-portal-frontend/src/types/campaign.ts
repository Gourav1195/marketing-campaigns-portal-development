import { Types } from 'mongoose';


export interface Schedule{
  frequency:  "Daily" | "Weekly" | "Monthly" | "";
  time: string,
  startDate: Date;
  endDate?: Date;
}

export interface CampaignData {  
    name: string;
    type: "Criteria-Based" | "Real-Time Triggered" | "Scheduled" | "";
    audience: Types.ObjectId | null;
    template: Types.ObjectId | null;  
    schedule: Schedule;
    status: "Draft" | "Scheduled" | "Active" | "On Going" | "Completed" | "Expired" | "Paused";
    openRate: number;
    ctr: number;
    delivered: number;
    publishedDate?: Date;
    createdAt?: Date;
} 

export interface Audience {
    id: Types.ObjectId; 
    name: string;
    description: string;
    icon: string;
  }

export interface Template {
  id: Types.ObjectId;
  type: "Email" | "SMS" | "Push Notifications";
  title: string;
  created_at: string;
  description: string;
  image: string;
}