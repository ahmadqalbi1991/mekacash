// app/apis/payment-links/hooks.ts
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { CheckPaymentResponse, CreatePaymentLinkPayload, ErrorResponse, PaymentLinkResponse, PaymentPayload } from "./paymentLinks.types";
import { checkPayment, createPaymentLink, payNow } from "./paymentLinksApis";

export const PaymentLinkApis = {
  useCreatePaymentLink: (
    options?: UseMutationOptions<PaymentLinkResponse, ErrorResponse, CreatePaymentLinkPayload>
  ) => {
    return useMutation({
      mutationKey: ["create-payment-link"],
      mutationFn: (payload: CreatePaymentLinkPayload) => createPaymentLink(payload),
      ...options,
    });
  },
  
  usePayNow: (
    options?: UseMutationOptions<ErrorResponse, ErrorResponse, PaymentPayload>
  ) => {
    return useMutation({
      mutationKey: ["pay-now"],
      mutationFn: (payload: PaymentPayload) => payNow(payload),
      ...options,
    });
  },

  useCheckPayment: (
    id: string,
    options?: UseQueryOptions<CheckPaymentResponse, ErrorResponse, CheckPaymentResponse>,
  ) => {
    return useQuery({
      queryKey: ["check-payment"],
      queryFn: async () => {
        const response = await checkPayment(id);
        return response;
      },
      ...options,
    });
  },
};
