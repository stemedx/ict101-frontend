import { API_CONFIG } from '@/lib/constants/api';
import { apiRequest } from './client';

export interface PlatformAccessProduct {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  product_type: 'PLATFORM_ACCESS';
}

export const courseProductsApi = {
  getPlatformAccessProduct: async (): Promise<PlatformAccessProduct | null> => {
    try {
      return await apiRequest<PlatformAccessProduct | null>(API_CONFIG.ENDPOINTS.PLATFORM_ACCESS_PRODUCT);
    } catch (error) {
      if (error instanceof Error && error.message.includes('status: 404')) {
        return null;
      }
      throw error;
    }
  },
};
