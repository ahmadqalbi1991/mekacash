// app/apis/payment-links/paymentLinksApi.ts
import { apiClient } from "@/lib/interceptor";
import { PAYMENT_LINK_ENDPOINTS } from "./endpoints";
import {
  CheckPaymentResponse,
  CreatePaymentLinkPayload,
  ErrorResponse,
  PaymentLinkResponse,
  PaymentPayload,
} from "./paymentLinks.types";

export const createPaymentLink = async (
  payload: CreatePaymentLinkPayload,
): Promise<PaymentLinkResponse> => {
  return apiClient(PAYMENT_LINK_ENDPOINTS.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const payNow = async (
  payload: PaymentPayload,
): Promise<ErrorResponse> => {
  return apiClient(PAYMENT_LINK_ENDPOINTS.PAY, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const checkPayment = async (
  id: string,
): Promise<CheckPaymentResponse> => {
  return apiClient(`${PAYMENT_LINK_ENDPOINTS.CHECK_PAYMENT}/${id}`, {
    method: "GET",
  });
};
