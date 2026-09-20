import { apiRequest } from './client';
import { API_CONFIG } from '@/lib/constants/api';

export interface CreateOrderRequest {
  product_id: string;
}

export interface CreateOrderResponse {
  checkout_url: string | null;
  free: boolean;
}

export interface CreateBankPaymentOrderRequest {
  product_id: string;
  transfer_type: 'one-time' | 'subscription' | 'platform-access';
}

export interface CreateBankPaymentOrderResponse {
  payment_reference: string;
}

export const purchasesApi = {
  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return apiRequest<CreateOrderResponse>(API_CONFIG.ENDPOINTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  createBankPaymentOrder: async (data: CreateBankPaymentOrderRequest): Promise<CreateBankPaymentOrderResponse> => {
    return apiRequest<CreateBankPaymentOrderResponse>(API_CONFIG.ENDPOINTS.BANK_PAYMENT_ORDER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
