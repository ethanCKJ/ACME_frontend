export function centsToDollar(cents: number) {
  return (cents / 100).toFixed(2);
}
export function dollarToCents(dollar: number) {
  return dollar * 100;
}
