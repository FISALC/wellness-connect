import { api } from "@/lib/api";
import { StorefrontConfig, DEFAULT_STOREFRONT } from "../types/storefront";

const BASE = "/api/v1";

export async function getStorefrontConfig(): Promise<StorefrontConfig> {
    try {
        const res = await api.get<StorefrontConfig>(`${BASE}/public/storefront`);
        return res.data;
    } catch {
        // Fallback if API fails or not ready
        return DEFAULT_STOREFRONT;
    }
}

export async function updateStorefrontConfig(config: StorefrontConfig): Promise<void> {
    await api.put(`${BASE}/admin/storefront`, config);
}
