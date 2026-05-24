import { MachineDefinition } from '../types/game';

export const MACHINE_COST_GROWTH = 1.18;
export const MACHINE_PRODUCTION_GROWTH = 1.12;

export const machineDefinitions: MachineDefinition[] = [
  { id: 'laser2d', name: 'Laser 2D', unlockPrice: 0, baseCost: 90, baseProduction: 1 },
  { id: 'profileLaser', name: 'Profile Laser', unlockPrice: 500, baseCost: 450, baseProduction: 5 },
  { id: 'pressBrake', name: 'Press Brake', unlockPrice: 1500, baseCost: 1200, baseProduction: 12 },
  { id: 'weldingStation', name: 'Welding Station', unlockPrice: 5000, baseCost: 3600, baseProduction: 28 },
  { id: 'grindingStation', name: 'Grinding Station', unlockPrice: 15000, baseCost: 10500, baseProduction: 65 },
  { id: 'paintShop', name: 'Paint Shop', unlockPrice: 50000, baseCost: 32000, baseProduction: 150 },
  { id: 'warehouse', name: 'Warehouse', unlockPrice: 150000, baseCost: 96000, baseProduction: 340 }
];
