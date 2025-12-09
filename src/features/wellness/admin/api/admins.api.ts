import { api } from "@/lib/api";

export type AdminUserDto = {
    id: string;
    username: string;
    email: string;
    role: string;
    // passwordHash is usually not returned for security, but we'll see
};

export type CreateAdminDto = {
    username: string;
    email: string;
    password: string;
    role: string;
};

export type UpdateAdminDto = {
    username: string;
    email: string;
    role: string;
    password?: string; // Optional: Send empty string if not changing
};

const BASE = "/api/v1/admin/wellness/admins";

export async function getAdmins() {
    const res = await api.get<AdminUserDto[]>(BASE);
    return res.data;
}

export async function getAdmin(id: string) {
    const res = await api.get<AdminUserDto>(`${BASE}/${id}`);
    return res.data;
}

export async function createAdmin(data: CreateAdminDto) {
    const res = await api.post<AdminUserDto>(BASE, data);
    return res.data;
}

export async function updateAdmin(id: string, data: UpdateAdminDto) {
    const res = await api.put<AdminUserDto>(`${BASE}/${id}`, data);
    return res.data;
}

export async function deleteAdmin(id: string) {
    const res = await api.delete(`${BASE}/${id}`);
    return res.data;
}
