// ============================================
// src/types/api/transactions.ts
// DTOs relacionados a Transactions
// Baseado em: Watchdog.Application.DTOs
// ============================================

import type { TransactionType } from './enums';
import type { Money } from './clientsInterfaces';

/**
 * Response DTO para Transaction
 * Baseado em: Watchdog.Application.DTOs.TransactionResponseDto
 */
export interface TransactionResponseDto {
  id: number; // long
  externalId: string; // Guid
  clientId: number; // long
  type: TransactionType;
  amount: Money;
  counterPartyId: number; // long
  occurredAt: string; // DateTime serializado como ISO string
  createdAt: string; // DateTime serializado como ISO string
}

/**
 * Request DTO para criar uma transação
 * Baseado em: Watchdog.Application.DTOs.CreateTransactionRequestDto
 */
export interface CreateTransactionRequestDto {
  clientId: number; // long
  type: TransactionType;
  amount: Money;
  counterPartyId: number; // long
  occurredAt: string; // DateTime
  createdAt: string; // DateTime
}