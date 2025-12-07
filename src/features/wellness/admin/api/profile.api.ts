
import { get, put } from "./client";

export type AdminProfileDto = {
    fullName: string;
    email: string;
    avatarUrl: string;
};

export type UpdateProfileDto = {
    fullName: string;
    avatarUrl: string;
};

export type ChangePasswordDto = {
    currentPassword: string;
    newPassword: string;
};

export async function getProfile() {
    return get<AdminProfileDto>("/api/v1/admin/wellness/profile");
}

export async function updateProfile(data: UpdateProfileDto) {
    return put<UpdateProfileDto, AdminProfileDto>("/api/v1/admin/wellness/profile", data);
}

export async function changePassword(data: ChangePasswordDto) {
    return put<ChangePasswordDto, void>("/api/v1/admin/wellness/profile/password", data);
}
