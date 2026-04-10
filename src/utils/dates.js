import { compareDesc, isValid, parse, parseISO } from 'date-fns';

const FORMATS = [
  'yyyy-MM-dd',
  'dd/MM/yyyy',
  'd/M/yyyy',
  'MM/dd/yyyy',
];

export function parseFechaCambio(value) {
  if (!value || typeof value !== 'string') return new Date(0);
  const trimmed = value.trim();
  const iso = parseISO(trimmed);
  if (isValid(iso)) return iso;
  const ref = new Date();
  for (const fmt of FORMATS) {
    const d = parse(trimmed, fmt, ref);
    if (isValid(d)) return d;
  }
  return new Date(0);
}

export function sortPartsByDate(parts) {
  return [...parts].sort((a, b) =>
    compareDesc(parseFechaCambio(a.fechaCambio), parseFechaCambio(b.fechaCambio))
  );
}
