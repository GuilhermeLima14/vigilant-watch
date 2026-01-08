// ============================================
// src/types/api/alerts.ts
// DTOs relacionados a Alerts
// Baseado em: Watchdog.Application.DTOs
// ============================================

import type { AlertSeverity, AlertStatus, RuleCode } from './enums';

/**
 * Response DTO para Alert
 * Baseado em: Watchdog.Application.DTOs.AlertResponseDto
 */
export interface AlertResponseDto {
  id: number; // long
  clientId: number; // long
  transactionId: number; // long
  ruleCode: RuleCode;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: string; // DateTime serializado como ISO string
  resolvedAt?: string; // DateTime? serializado como ISO string
}

/**
 * Request DTO para criar um alerta
 * Baseado em: Watchdog.Application.DTOs.CreateAlertRequestDto
 */
export interface CreateAlertRequestDto {
  clientId: number; // long
  transactionId: number; // long
  ruleCode: RuleCode;
  severity: AlertSeverity;
  createdAt: string; // DateTime
}

/**
 * Request DTO para resolver um alerta
 * Baseado em: Watchdog.Application.DTOs.ResolveAlertRequestDto
 */
export interface ResolveAlertRequestDto {
  resolvedAt: string; // DateTime
}