export type MachineId =
  | 'laser2d'
  | 'profileLaser'
  | 'pressBrake'
  | 'weldingStation'
  | 'grindingStation'
  | 'paintShop'
  | 'warehouse';

export type LeanUpgradeId = '5s' | 'tpm' | 'kaizen' | 'kanban' | 'foreman';

export interface MachineDefinition {
  id: MachineId;
  name: string;
  unlockPrice: number;
  baseCost: number;
  baseProduction: number;
}

export interface LeanUpgradeDefinition {
  id: LeanUpgradeId;
  name: string;
  description: string;
  cost: number;
  incomeMultiplier: number;
}

export interface OrderDefinition {
  id: string;
  title: string;
  requirement: number;
  reward: number;
}

export interface GameState {
  money: number;
  lifetimeProduced: number;
  machines: Record<MachineId, number>;
  leanUpgradesOwned: LeanUpgradeId[];
  completedOrders: string[];
  lastSavedAt: number;
}
