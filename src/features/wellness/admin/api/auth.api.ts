import { api } from "@/lib/api";

export type LoginDto = {
    username: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    username: string;
    role: "Admin" | "SuperAdmin" | "Editor";
};

export async function login(credentials: LoginDto) {
    const res = await api.post<AuthResponse>("/api/v1/admin/wellness/login", credentials);
    return res.data;
}
