// ============================================
// src/types/api/clients.ts
// DTOs relacionados a Clients
// Baseado em: Watchdog.Application.DTOs
// ============================================

import type { RiskLevel, KYCStatus } from './enums';
import type { PagedRequestDto } from './paginated';

/**
 * Value Object Money
 * Baseado em: Watchdog.Domain.ValueObjects.Money
 */
export interface Money {
  value: number;
  currencyCode: string;
}

/**
 * Response DTO para Client
 * Baseado em: Watchdog.Application.DTOs.Responses.ClientResponseDto
 */
export interface ClientResponseDto {
  externalId: string; // Guid
  name: string;
  countryCode: string;
  riskLevel: RiskLevel;
  kycStatus: KYCStatus;
}

/**
 * Request DTO para criar um cliente
 * Baseado em: Watchdog.Application.DTOs.Requests.CreateClientRequestDto
 */
export interface CreateClientRequestDto {
  name: string;
  countryCode: string; // 2 caracteres
  balance: Money;
  riskLevel?: RiskLevel; // default: Low
  kycStatus?: KYCStatus; // default: Pending
}

/**
 * Request DTO para atualizar o nível de risco
 * Baseado em: Watchdog.Application.DTOs.Requests.UpdateClientRiskRequestDto
 */
export interface UpdateClientRiskRequestDto {
  riskLevel: RiskLevel;
}

/**
 * Request DTO para atualizar o status KYC
 * Baseado em: Watchdog.Application.DTOs.Requests.UpdateClientKycStatusRequestDto
 */
export interface UpdateClientKycStatusRequestDto {
  kycStatus: KYCStatus;
}

/**
 * Request DTO para filtros de cliente
 * Baseado em: Watchdog.Application.DTOs.Requests.ClientFilterRequestDto
 */
export interface ClientFilterRequestDto extends PagedRequestDto {
  name?: string;
  country?: string;
  riskLevel?: RiskLevel;
  kycStatus?: KYCStatus;
}