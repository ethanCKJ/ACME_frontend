export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const currentYear = new Date().getFullYear();
export const years = [
  currentYear + 1,
  currentYear + 2,
  currentYear + 3,
  currentYear + 4,
  currentYear + 5,
  currentYear + 6,
];
export const reg = new RegExp("^\\d*$");

