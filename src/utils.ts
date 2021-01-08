import numeral from 'numeral';

export interface IBreakpoint {
  label: string;
  threshold: number;
}

export enum Currency {
  KRW = 'KRW',
}

export const breakpoints: IBreakpoint[] = [{
  label: '만',
  threshold: 10000,
}, {
  label: '억',
  threshold: 10000 ** 2,
}, {
  label: '조',
  threshold: 10000 ** 3,
}, {
  label: '경',
  threshold: 10000 ** 4,
}];

export function readByBreakpoint(value: number, breakpoint: IBreakpoint) {
  return [
    format(value / breakpoint.threshold),
    breakpoint.label,
  ].join('');
}

export function format(value: number) {
  return numeral(Math.floor(value))
    .format('0,0');
}

export function getBreakpoints(value: number): IBreakpoint[] {
  return breakpoints
    .filter((x) => {
      return x.threshold <= value;
    });
}
