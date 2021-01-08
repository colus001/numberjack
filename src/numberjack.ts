import { Currency, format, getBreakpoints, readByBreakpoint } from './utils';

declare global {
  namespace NodeJS {
    interface Global {
      currency: Currency | null;
    }
  }
}

interface IState {
  value: number;
  surfix: '원',
}

global.currency = Currency.KRW;

function numberjack(value: number) {
  const _state: IState = {
    value,
    surfix: '원',
  };

  return {
    read(): string {
      let value = _state.value;
      const breakpoints = getBreakpoints(value).reverse();
      if (!breakpoints.length) {
        return [
          format(value),
          _state.surfix,
        ].join('');
      }

      return breakpoints
        .map((breakpoint) => {
          if (value < 1) return;

          const text = readByBreakpoint(value, breakpoint);
          value %= breakpoint.threshold;

          return text;
        })
        .filter(x => x)
        .concat(_state.surfix)
        .join('');
    },
  }
}

export default numberjack;
