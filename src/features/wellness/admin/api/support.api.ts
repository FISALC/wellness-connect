import { api } from "@/lib/api";
import { Inquiry, InquiryStatus } from "../types/support";

const BASE = "/api/v1";

export async function getInquiries(): Promise<Inquiry[]> {
    const res = await api.get<Inquiry[]>(`${BASE}/admin/support/inquiries`);
    return res.data;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
    await api.put(`${BASE}/admin/support/inquiries/${id}/status`, { status });
}
