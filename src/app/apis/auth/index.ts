import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ErrorResponse, LoginPayload, LoginResponse } from "./auth.types";
import { createCrfToken, login } from "./authApis";

export const AuthApis = {
  useLogin: (
    options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginPayload>,
  ) => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: async (payload: LoginPayload) => {
        const response = await login(payload);
        return response as LoginResponse;
      },
      ...options,
    });
  },
  
  useGenerateCsrf: () => {
    return useMutation({
      mutationKey: ["generate-csrf"],
      mutationFn: async () => {
        await createCrfToken();
        return undefined;
      },
    });
  },
};
