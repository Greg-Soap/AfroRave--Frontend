export function formatNaira(amount: number) {
  if (amount < 1000) {
    return `₦${amount.toLocaleString()}`;
  }

  if (amount < 1000000) {
    return `₦${(amount / 1000).toFixed(1).toLocaleString()}K`;
  }

  if (amount > 1000000) {
    return `₦${(amount / 1000000).toFixed(1).toLocaleString()}M`;
  }
}
