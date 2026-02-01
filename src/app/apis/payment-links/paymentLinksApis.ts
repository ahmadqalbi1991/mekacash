// app/apis/payment-links/paymentLinksApi.ts
import { apiClient } from "@/lib/interceptor";
import { PAYMENT_LINK_ENDPOINTS } from "./endpoints";
import { CreatePaymentLinkPayload, PaymentLinkResponse } from "./paymentLinks.types";

export const createPaymentLink = async (
  payload: CreatePaymentLinkPayload
): Promise<PaymentLinkResponse> => {
  return apiClient(PAYMENT_LINK_ENDPOINTS.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
