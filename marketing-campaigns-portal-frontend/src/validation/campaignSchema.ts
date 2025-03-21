import * as yup from "yup";


const scheduleValidationSchema = yup.object({
  frequency: yup
    .string()
    .oneOf(["Daily", "Weekly", "Monthly"], "Invalid frequency")
    .required("Frequency is required"),
  time: yup.string().required("Time is required"),
  startDate: yup
    .date()
    .required("Start date is required"),
  endDate: yup
    .date()
    .nullable()
    .min(yup.ref("startDate"), "End date must be after start date")
});


export const campaignValidationSchema = yup.object({
  name: yup.string().required("Campaign name is required"),
  type: yup
    .string()
    .oneOf(["Criteria-Based", "Real-Time Triggered", "Scheduled"], "Invalid campaign type")
    .required("Campaign type is required"),

    audience: yup.string().required("Audience is required"),
  template: yup.string().required("Template is required"),
  schedule: scheduleValidationSchema,
  status: yup
    .string()
    .oneOf(["Draft", "Scheduled", "Active", "On Going", "Completed", "Expired", "Paused"], "Invalid status")
    .required("Status is required"),
  openRate: yup
    .number()
    .min(0, "Open rate cannot be negative")
    .required("Open rate is required"),
  ctr: yup
    .number()
    .min(0, "CTR cannot be negative")
    .required("CTR is required"),
  delivered: yup
    .number()
    .min(0, "Delivered count cannot be negative")
    .required("Delivered count is required"),
  publishedDate: yup.date().nullable(),
  createdAt: yup.date().nullable()
});
