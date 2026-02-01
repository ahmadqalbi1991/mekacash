// app/apis/payment-links/hooks.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreatePaymentLinkPayload, ErrorResponse, PaymentLinkResponse } from "./paymentLinks.types";
import { createPaymentLink } from "./paymentLinksApis";

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
};
