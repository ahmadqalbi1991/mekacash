import { apiClient } from '@/lib/interceptor';
import { MERCHANT_ENDPOINTS } from './endpoints';
import {
  GetApiKeyResponse,
  GenerateApiKeyResponse,
  RevokeApiKeyResponse,
} from './keys.types';

export const getApiKey = async (): Promise<GetApiKeyResponse> => {
  return apiClient(MERCHANT_ENDPOINTS.GET_KEY, {
    method: 'GET',
  });
};

export const generateApiKey = async (): Promise<GenerateApiKeyResponse> => {
  return apiClient(MERCHANT_ENDPOINTS.GENERATE_KEY, {
    method: 'POST',
  });
};

export const revokeApiKey = async (): Promise<RevokeApiKeyResponse> => {
  return apiClient(MERCHANT_ENDPOINTS.REVOKE_KEY, {
    method: 'DELETE',
  });
};
