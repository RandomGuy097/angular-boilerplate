export class DIContainer {
  private static instances = new Map();

  static resolve<T>(target: Function): T {
    if (DIContainer.instances.has(target)) {
      return DIContainer.instances.get(target);
    }

    // const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = []; //  tokens.map(token => Container.inject<any>(token));

    const instance = new (target as any)(...injections);
    DIContainer.instances.set(target, instance);
    return instance;
  }

  static inject<T>(target: new (...args: any[]) => T): T {
    return new Proxy(
      {},
      {
        get: (_, propName) => {
          let instance: T =
            DIContainer.instances.get(target) ||
            DIContainer.resolve(target);
          return typeof instance[propName] === 'function'
            ? instance[propName].bind(instance)
            : instance[propName];
        },
        set: (_, propName, value) => {
          let instance: T =
            DIContainer.instances.get(target) ||
            DIContainer.resolve(target);
          instance[propName] = value;
          return true;
        },
      },
    ) as T;
  }
}
