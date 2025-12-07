// src/features/wellness/admin/types/support.ts

export type InquiryStatus = "New" | "Read" | "Replied" | "Archived";

export type Inquiry = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: InquiryStatus;
    createdAt: string;
};
