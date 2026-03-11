export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const splitCsvToArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);