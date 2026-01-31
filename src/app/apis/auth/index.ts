import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ErrorResponse, LoginPayload, UserLoginResponse } from "./auth.types";
import { createCrfToken, login } from "./authApis";

export const AuthApis = {
  useLogin: (
    options?: UseMutationOptions<UserLoginResponse, ErrorResponse, LoginPayload>,
  ) => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: async (payload: LoginPayload) => {
        const response = await login(payload);
        return response as UserLoginResponse;
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
