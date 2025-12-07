import { api } from "@/lib/api";

export async function get<T>(url: string) {
  const res = await api.get<T>(url);
  return res.data;
}

export async function post<TBody, TRes>(url: string, body: TBody) {
  const res = await api.post<TRes>(url, body);
  return res.data;
}

export async function put<TBody, TRes>(url: string, body: TBody) {
  const res = await api.put<TRes>(url, body);
  return res.data;
}

export async function del<TRes>(url: string) {
  const res = await api.delete<TRes>(url);
  return res.data;
}
