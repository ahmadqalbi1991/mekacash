import { apiClient } from "@/lib/interceptor";
import { LoginPayload } from "./auth.types";
import { AUTH_ENDPOINTS } from "./endpoints";

export const login = async (payload: LoginPayload) => {    
  return apiClient(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const createCrfToken = async () => {
  return apiClient(AUTH_ENDPOINTS.CSRF, {
    method: 'GET',
  });
};