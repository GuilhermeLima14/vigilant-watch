// ============================================
// src/types/api/apiResponse.ts
// Wrappers de resposta da API
// Baseado em: Watchdog.Application.Responses
// ============================================

import type { PaginationResponse } from './paginated';

/**
 * Response padrão da API
 * Baseado em: Watchdog.Application.Responses.ApiResponse<T>
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: PaginationResponse;
}