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
  prefix: string | null,
  suffix: '원' | string | null,
}

global.currency = Currency.KRW;

function numberjack(value: number) {
  const _state: IState = {
    value,
    prefix: null,
    suffix: '원',
  };

  return {
    setSuffix(suffix: string) {
      _state.suffix = suffix;
    },

    setPrefix(prefix: string) {
      _state.prefix = prefix;
    },

    read(): string {
      let value = _state.value;
      const breakpoints = getBreakpoints(value).reverse();
      if (!breakpoints.length) {
        return [_state.prefix, format(value), _state.suffix]
          .filter(x => x)
          .join('');
      }

      const points = breakpoints
        .map((breakpoint) => {
          if (value < 1) return;

          const text = readByBreakpoint(value, breakpoint);
          value %= breakpoint.threshold;

          return text;
        });

      return [_state.prefix, ...points, _state.suffix]
        .filter(x => x)
        .join('');
    },
  }
}

export default numberjack;
