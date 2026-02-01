import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { GenerateApiKeyResponse, GetApiKeyResponse, RevokeApiKeyResponse } from './keys.types';
import { ErrorResponse } from '../auth/auth.types';
import { generateApiKey, getApiKey, revokeApiKey } from './keysApis';

export const MerchantApis = {
  /* =======================
     GET API KEY
  ======================= */
  useGetApiKey: (
    options?: UseQueryOptions<GetApiKeyResponse, ErrorResponse>,
  ) => {
    return useQuery({
      queryKey: ['merchant-api-key'],
      queryFn: async () => {
        const response = await getApiKey();
        return response as GetApiKeyResponse;
      },
      ...options,
    });
  },

  /* =======================
     GENERATE API KEY
  ======================= */
  useGenerateApiKey: (
    options?: UseMutationOptions<
      GenerateApiKeyResponse,
      ErrorResponse,
      void
    >,
  ) => {
    return useMutation({
      mutationKey: ['generate-api-key'],
      mutationFn: async () => {
        const response = await generateApiKey();
        return response as GenerateApiKeyResponse;
      },
      ...options,
    });
  },

  /* =======================
     REVOKE API KEY
  ======================= */
  useRevokeApiKey: (
    options?: UseMutationOptions<
      RevokeApiKeyResponse,
      ErrorResponse,
      void
    >,
  ) => {
    return useMutation({
      mutationKey: ['revoke-api-key'],
      mutationFn: async () => {
        const response = await revokeApiKey();
        return response as RevokeApiKeyResponse;
      },
      ...options,
    });
  },
};
