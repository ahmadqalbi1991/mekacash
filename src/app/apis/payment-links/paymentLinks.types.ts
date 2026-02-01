// app/apis/payment-links/types.ts

export interface CreatePaymentLinkPayload {
  title: string;
  description?: string;
  currency: string;
  customer_name: string;
  customer_email: string;
  allow_partial?: boolean;
  min_amount?: number;
  expiry?: string | number; // in days
  send_email?: boolean;
}

export interface PaymentLink {
  id: number;
  uuid: string;
  merchant_id: number;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  allow_partial: boolean;
  min_amount?: number;
  expires_at?: string;
  status: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentLinkResponse {
  status: boolean;
  message: string;
  data: PaymentLink;
}

export interface ErrorResponse {
  status: boolean;
  message: string;
}
