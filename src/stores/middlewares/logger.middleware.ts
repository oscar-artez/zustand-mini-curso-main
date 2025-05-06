const loggerImpl: any =
  (f: any, name: any) => (set: any, get: any, store: any) => {
    const loggedSet: typeof set = (...a: any[]) => {
      set(...a);
      console.log(...(name ? [`${name}:`] : []), get());
    };
    store.setState = loggedSet;

    return f(loggedSet, get, store);
  };

export const logger = loggerImpl as unknown as any;
