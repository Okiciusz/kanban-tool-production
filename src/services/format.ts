export const formatCompact = (value: number): string => {
  if (value < 1000) return `${Math.floor(value)}`;
  const units = ['K', 'M', 'B', 'T'];
  let n = value;
  let i = -1;
  while (n >= 1000 && i < units.length - 1) {
    n /= 1000;
    i += 1;
  }
  return `${n.toFixed(n >= 10 ? 1 : 2).replace(/\.0+$/, '').replace(/(\.\d)0$/, '$1')}${units[i]}`;
};
