import { LeanUpgradeDefinition } from '../types/game';

export const leanUpgrades: LeanUpgradeDefinition[] = [
  { id: '5s', name: '5S', description: 'Organized floor improves all throughput.', cost: 250, incomeMultiplier: 1.1 },
  { id: 'tpm', name: 'TPM', description: 'Fewer breakdowns raise uptime.', cost: 1200, incomeMultiplier: 1.18 },
  { id: 'kaizen', name: 'Kaizen', description: 'Continuous improvements add output.', cost: 4200, incomeMultiplier: 1.28 },
  { id: 'kanban', name: 'Kanban', description: 'Flow control cuts waiting time.', cost: 9000, incomeMultiplier: 1.38 },
  { id: 'foreman', name: 'Foreman', description: 'Hands-on leader boosts all teams.', cost: 18000, incomeMultiplier: 1.5 }
];
