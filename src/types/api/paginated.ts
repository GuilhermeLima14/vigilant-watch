// ============================================
// src/types/api/paginated.ts
// DTOs de paginação
// Baseado em: Watchdog.Application.DTOs.Responses
// ============================================

/**
 * Response paginado genérico
 * Baseado em: Watchdog.Application.DTOs.Responses.PagedResponseDto<T>
 */
export interface PagedResponseDto<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number; // Calculado: Math.ceil(totalItems / pageSize)
}

/**
 * Informações de paginação na resposta da API
 * Baseado em: Watchdog.Application.Responses.PaginationResponse
 */
export interface PaginationResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Request DTO para paginação
 * Baseado em: Watchdog.Application.DTOs.Requests.PagedRequestDto
 */
export interface PagedRequestDto {
  page?: number; // default: 1, min: 1
  pageSize?: number; // default: 10, min: 1, max: 100
}